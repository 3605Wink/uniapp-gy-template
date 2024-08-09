export interface keyboardProps {
  modelValue: string;
	show: boolean;
  type?:'newEnergy' | 'energy'
}

export interface CarKeyboardItem {
	value: string;
	disabled: boolean;
}

export type FillDataFunction = (rawData: string[]) => CarKeyboardItem[];