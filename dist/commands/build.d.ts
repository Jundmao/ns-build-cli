import { Command } from '@oclif/core';
export default class Build extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        debug: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        all: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
