<!-- eslint-disable no-unreachable -->
<script lang="ts" setup>
type SimpleTypes<T> = T extends string | number | boolean | null | undefined | bigint ? T : never;

type MODELVALUE = SimpleTypes<number | string | null | undefined>;

const {
	show,
	modelValue,
	data,
	textKey = "text",
	valueKey = "value",
} = defineProps<{
	show: boolean;
	modelValue: MODELVALUE | MODELVALUE[];
	data: any[] | any[][];
	textKey?: string;
	valueKey?: string;
}>();
const emits = defineEmits(["change", "update:show", "cancel", "confirm", "update:modelValue"]);
let hidden = $ref(false);

const isArray2D = arr => {
	if (arr?.length == 0) return;
	const is2DArray = Array.isArray(arr[0]);
	if (is2DArray) return true;
	else return false;
};

const findIndex = (arr: any[] | any[][], values: MODELVALUE | MODELVALUE[]): number[] => {
	const is2DArray = Array.isArray(arr[0]) && arr.some(subArr => subArr.length > 0);
	if (is2DArray) {
		return [
			...arr.map((item: any[], index) => {
				return item?.findIndex(sub_item => sub_item[valueKey] == (values as MODELVALUE[])[index]);
			}),
		];
	} else {
		return [arr?.findIndex(item => item[valueKey] == values)];
	}
};

const DEFAULT_OPTION = {
	[textKey]: "请选择",
	[valueKey]: undefined,
};

const getOptionList = $computed((): any[] | any[][] => {
	if (isArray2D(data)) {
		if (Array?.isArray(modelValue)) {
			if (modelValue?.length != data?.length) return data.map(item => [DEFAULT_OPTION, ...item]);
			else if (modelValue?.some(item => item == undefined)) return data.map(item => [DEFAULT_OPTION, ...item]);
			else return data;
		} else {
			throw new Error(
				"当传入多维数组时，modelValue也必须为数组，并且modelValue的长度必须与数组长度相等，modelValue内容为索引"
			);
		}
	} else {
		if (modelValue === undefined || modelValue == null) return [DEFAULT_OPTION].concat([...data]);
		else return data;
	}
});

// 计算属性 pickerValue
const getPickerValue = $computed(() => {
	const isOptionList2D = isArray2D(getOptionList);

	if (isOptionList2D) {
		if (Array.isArray(modelValue))
			return findIndex(getOptionList, isOptionList2D ? modelValue : findIndex(getOptionList, modelValue));
		else
			throw new Error(
				"当传入多维数组时，modelValue也必须为数组，并且modelValue的长度必须与数组长度相等，modelValue内容为索引"
			);
	} else {
		return findIndex(getOptionList, modelValue);
	}
});

let current = $ref<number | number[]>(0);

const change = e => {
	current = e.detail.value;
	if (Array.isArray(e.detail.value)) {
		emits("change", [
			...e.detail.value.map((item, index) => {
				return getOptionList[index][item];
			}),
		]);
	} else {
		emits("change", getOptionList[e.detail.value]);
	}
};

watch(
	() => show,
	newValue => {
		hidden = newValue;
	}
);

const cancel = () => {
	emits("update:show", false);
	emits("cancel");
};

const confirm = () => {
	emits("update:show", false);
	if (Array.isArray(current)) {
		emits("confirm", [
			...current.map((item, index) => {
				return getOptionList[index][item];
			}),
		]);
		emits("update:modelValue", [
			...current.map((item, index) => {
				return getOptionList[index][item][valueKey];
			}),
		]);
	} else {
		emits("confirm", getOptionList[current]);
		emits("update:modelValue", getOptionList[current][valueKey]);
	}
};
</script>

<template>
	<gy-popup v-model="hidden" :close="false">
		<div class="picker">
			<picker-view
				:value="getPickerValue"
				:immediate-change="true"
				indicator-style="height:36px"
				class="picker-view"
				@change="change"
			>
				<template v-if="isArray2D(data)">
					<picker-view-column v-for="(item, index) in getOptionList" :key="index" class="picker-view-item">
						<div v-for="(sub_item, sub_index) in item" :key="sub_index" class="picker-view-option">
							{{ sub_item[textKey] }}
						</div>
					</picker-view-column>
				</template>
				<template v-else>
					<picker-view-column class="picker-view-item">
						<div v-for="(item, index) in getOptionList" :key="index" class="picker-view-option">
							{{ item[textKey] }}
						</div>
					</picker-view-column>
				</template>
			</picker-view>
			<slot>
				<div class="button-group__round">
					<div class="cancel" @click="cancel">取消</div>
					<div class="confirm" @click="confirm">确定</div>
				</div>
			</slot>
		</div>
	</gy-popup>
</template>

<style scoped lang="less">
.picker {
	display: grid;
	grid-template-rows: repeat(2, max-content);
	align-content: space-between;
	height: 100%;

	&-view {
		height: 300px;

		&-item {
			height: 300px;
		}

		&-option {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 16px;
			font-weight: 600;
			text-align: center;
		}
	}
}

.button-group__round {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: 100%;
	margin-top: 8px;
	gap: 32px;

	.cancel {
		width: 100%;
		height: 40px;
		border-radius: 30px;
		background-color: rgb(245 245 245);
		color: #252525;
		font-size: 14px;
		font-weight: 600;
		line-height: 40px;
		text-align: center;
	}

	.confirm {
		width: 100%;
		height: 40px;
		border-radius: 30px;
		background-color: #328efe;
		color: #fff;
		font-size: 14px;
		font-weight: 600;
		line-height: 40px;
		text-align: center;
	}
}
</style>
