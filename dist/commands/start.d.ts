import { Command } from '@oclif/core';
export default class Start extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        port: import("@oclif/core/lib/interfaces").OptionFlag<number>;
        host: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        open: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
