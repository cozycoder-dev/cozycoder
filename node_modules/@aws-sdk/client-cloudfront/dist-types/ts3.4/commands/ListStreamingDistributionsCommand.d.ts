import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListStreamingDistributionsRequest,
  ListStreamingDistributionsResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListStreamingDistributionsCommandInput
  extends ListStreamingDistributionsRequest {}
export interface ListStreamingDistributionsCommandOutput
  extends ListStreamingDistributionsResult,
    __MetadataBearer {}
declare const ListStreamingDistributionsCommand_base: {
  new (
    input: ListStreamingDistributionsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListStreamingDistributionsCommandInput,
    ListStreamingDistributionsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListStreamingDistributionsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListStreamingDistributionsCommandInput,
    ListStreamingDistributionsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListStreamingDistributionsCommand extends ListStreamingDistributionsCommand_base {
  protected static __types: {
    api: {
      input: ListStreamingDistributionsRequest;
      output: ListStreamingDistributionsResult;
    };
    sdk: {
      input: ListStreamingDistributionsCommandInput;
      output: ListStreamingDistributionsCommandOutput;
    };
  };
}
