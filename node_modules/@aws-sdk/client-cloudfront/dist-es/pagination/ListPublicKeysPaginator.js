import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListPublicKeysCommand, } from "../commands/ListPublicKeysCommand";
export const paginateListPublicKeys = createPaginator(CloudFrontClient, ListPublicKeysCommand, "Marker", "PublicKeyList.NextMarker", "MaxItems");
