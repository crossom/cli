import type { Input } from "./input";

interface ActionParams {
	inputs?: Array<Input>;
	options?: Array<Input>;
	extraFlags?: Array<string>;
}

export type Action = (params: ActionParams) => void;
