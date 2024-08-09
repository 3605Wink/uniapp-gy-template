import type { ComponentInternalInstance } from "vue";
import { useSelectorQuery } from "../useSelectorQuery/index";

export async function useRect(id: string, instance?: ComponentInternalInstance): Promise<UniApp.NodeInfo> {
	const { getSelectorNodeInfo } = useSelectorQuery(instance);
	return await getSelectorNodeInfo(id);
}

export async function useRectMult(id: string[], instance?: ComponentInternalInstance): Promise<UniApp.NodeInfo[]> {
	const { getSelectorNodeInfoExec } = useSelectorQuery(instance);
	return await getSelectorNodeInfoExec(id);
}
