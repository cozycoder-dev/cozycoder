import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListCloudFrontOriginAccessIdentitiesRequest,
  ListCloudFrontOriginAccessIdentitiesResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListCloudFrontOriginAccessIdentitiesCommandInput
  extends ListCloudFrontOriginAccessIdentitiesRequest {}
export interface ListCloudFrontOriginAccessIdentitiesCommandOutput
  extends ListCloudFrontOriginAccessIdentitiesResult,
    __MetadataBearer {}
declare const ListCloudFrontOriginAccessIdentitiesCommand_base: {
  new (
    input: ListCloudFrontOriginAccessIdentitiesCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListCloudFrontOriginAccessIdentitiesCommandInput,
    ListCloudFrontOriginAccessIdentitiesCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListCloudFrontOriginAccessIdentitiesCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListCloudFrontOriginAccessIdentitiesCommandInput,
    ListCloudFrontOriginAccessIdentitiesCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListCloudFrontOriginAccessIdentitiesCommand extends ListCloudFrontOriginAccessIdentitiesCommand_base {
  protected static __types: {
    api: {
      input: ListCloudFrontOriginAccessIdentitiesRequest;
      output: ListCloudFrontOriginAccessIdentitiesResult;
    };
    sdk: {
      input: ListCloudFrontOriginAccessIdentitiesCommandInput;
      output: ListCloudFrontOriginAccessIdentitiesCommandOutput;
    };
  };
}
