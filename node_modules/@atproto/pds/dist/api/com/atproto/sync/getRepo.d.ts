import stream from 'node:stream';
import { AppContext } from '../../../../context';
import { Server } from '../../../../lexicon';
export default function (server: Server, ctx: AppContext): void;
export declare const getCarStream: (ctx: AppContext, did: string, since?: string) => Promise<stream.Readable>;
//# sourceMappingURL=getRepo.d.ts.map