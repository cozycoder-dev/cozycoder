import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListAnycastIpListsRequest,
  ListAnycastIpListsResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListAnycastIpListsCommandInput
  extends ListAnycastIpListsRequest {}
export interface ListAnycastIpListsCommandOutput
  extends ListAnycastIpListsResult,
    __MetadataBearer {}
declare const ListAnycastIpListsCommand_base: {
  new (
    input: ListAnycastIpListsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListAnycastIpListsCommandInput,
    ListAnycastIpListsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListAnycastIpListsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListAnycastIpListsCommandInput,
    ListAnycastIpListsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListAnycastIpListsCommand extends ListAnycastIpListsCommand_base {
  protected static __types: {
    api: {
      input: ListAnycastIpListsRequest;
      output: ListAnycastIpListsResult;
    };
    sdk: {
      input: ListAnycastIpListsCommandInput;
      output: ListAnycastIpListsCommandOutput;
    };
  };
}
