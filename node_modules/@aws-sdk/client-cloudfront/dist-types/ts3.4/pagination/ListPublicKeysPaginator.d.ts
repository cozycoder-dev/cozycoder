import { Paginator } from "@smithy/types";
import {
  ListPublicKeysCommandInput,
  ListPublicKeysCommandOutput,
} from "../commands/ListPublicKeysCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
export declare const paginateListPublicKeys: (
  config: CloudFrontPaginationConfiguration,
  input: ListPublicKeysCommandInput,
  ...rest: any[]
) => Paginator<ListPublicKeysCommandOutput>;
