import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListVpcOriginsRequest,
  ListVpcOriginsResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListVpcOriginsCommandInput extends ListVpcOriginsRequest {}
export interface ListVpcOriginsCommandOutput
  extends ListVpcOriginsResult,
    __MetadataBearer {}
declare const ListVpcOriginsCommand_base: {
  new (
    input: ListVpcOriginsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListVpcOriginsCommandInput,
    ListVpcOriginsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListVpcOriginsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListVpcOriginsCommandInput,
    ListVpcOriginsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListVpcOriginsCommand extends ListVpcOriginsCommand_base {
  protected static __types: {
    api: {
      input: ListVpcOriginsRequest;
      output: ListVpcOriginsResult;
    };
    sdk: {
      input: ListVpcOriginsCommandInput;
      output: ListVpcOriginsCommandOutput;
    };
  };
}
