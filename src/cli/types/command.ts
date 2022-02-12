import type { Command } from "commander";

interface CustomCommandParams {
	action: (params?: any) => void;
	program: Command;
}

export type CustomCommand = (params: CustomCommandParams) => void;
