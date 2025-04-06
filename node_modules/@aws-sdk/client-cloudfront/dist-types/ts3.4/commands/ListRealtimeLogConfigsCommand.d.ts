import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListRealtimeLogConfigsRequest,
  ListRealtimeLogConfigsResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListRealtimeLogConfigsCommandInput
  extends ListRealtimeLogConfigsRequest {}
export interface ListRealtimeLogConfigsCommandOutput
  extends ListRealtimeLogConfigsResult,
    __MetadataBearer {}
declare const ListRealtimeLogConfigsCommand_base: {
  new (
    input: ListRealtimeLogConfigsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListRealtimeLogConfigsCommandInput,
    ListRealtimeLogConfigsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListRealtimeLogConfigsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListRealtimeLogConfigsCommandInput,
    ListRealtimeLogConfigsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListRealtimeLogConfigsCommand extends ListRealtimeLogConfigsCommand_base {
  protected static __types: {
    api: {
      input: ListRealtimeLogConfigsRequest;
      output: ListRealtimeLogConfigsResult;
    };
    sdk: {
      input: ListRealtimeLogConfigsCommandInput;
      output: ListRealtimeLogConfigsCommandOutput;
    };
  };
}
