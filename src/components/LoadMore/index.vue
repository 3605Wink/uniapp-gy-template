<script lang="ts" setup></script>

<template>
	<div class="loader">
		<span class="l">加</span>
		<span class="o">载</span>
		<span class="a">中</span>
		<!-- <span class="d">d</span>
		<span class="i">i</span>
		<span class="n">n</span>
		<span class="g">g</span> -->
		<span class="d1">·</span>
		<span class="d2">·</span>
		<span class="d3">·</span>
	</div>
</template>

<style scoped lang="less">
.loader {
	position: relative;
	left: 50%;
	width: fit-content;
	height: 20px;
	height: 40rpx;
	transform: translate(-50%);
	color: #328efe !important;
	font-size: 14px;
	font-weight: 500;
}

.l {
	animation: pass 1s ease-in-out infinite;
	animation-delay: 0.1s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.o {
	animation: pass 1s ease-in-out infinite;
	animation-delay: 0.2s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.a {
	animation: pass 1s ease-in-out infinite;
	animation-delay: 0.3s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.d {
	animation: pass 2s ease-in-out infinite;
	animation-delay: 0.4s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.i {
	animation: pass 2s ease-in-out infinite;
	animation-delay: 5s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.n {
	animation: pass 2s ease-in-out infinite;
	animation-delay: 0.6s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.g {
	animation: pass 2s ease-in-out infinite;
	animation-delay: 0.7s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.d1 {
	animation: pass1 2s ease-in-out infinite;
	animation-delay: 0.8s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.d2 {
	animation: pass1 2s ease-in-out infinite;
	animation-delay: 0.9s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

.d3 {
	animation: pass1 2s ease-in-out infinite;
	animation-delay: 1s;
	opacity: 0;
	color: #328efe;
	letter-spacing: 8px;
	text-shadow: 2px 2px 3px #919191;
}

@keyframes pass {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0.2;
	}

	100% {
		opacity: 1;
	}
}

@keyframes pass1 {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0.2;
	}

	100% {
		opacity: 1;
	}
}
</style>
