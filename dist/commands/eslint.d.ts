import { Command } from '@oclif/core';
export default class EslintCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        fix: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static args: never[];
    run(): Promise<void>;
}
