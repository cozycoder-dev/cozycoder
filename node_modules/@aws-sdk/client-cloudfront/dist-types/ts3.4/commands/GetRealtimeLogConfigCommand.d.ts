import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  GetRealtimeLogConfigRequest,
  GetRealtimeLogConfigResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface GetRealtimeLogConfigCommandInput
  extends GetRealtimeLogConfigRequest {}
export interface GetRealtimeLogConfigCommandOutput
  extends GetRealtimeLogConfigResult,
    __MetadataBearer {}
declare const GetRealtimeLogConfigCommand_base: {
  new (
    input: GetRealtimeLogConfigCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetRealtimeLogConfigCommandInput,
    GetRealtimeLogConfigCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [GetRealtimeLogConfigCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    GetRealtimeLogConfigCommandInput,
    GetRealtimeLogConfigCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetRealtimeLogConfigCommand extends GetRealtimeLogConfigCommand_base {
  protected static __types: {
    api: {
      input: GetRealtimeLogConfigRequest;
      output: GetRealtimeLogConfigResult;
    };
    sdk: {
      input: GetRealtimeLogConfigCommandInput;
      output: GetRealtimeLogConfigCommandOutput;
    };
  };
}
