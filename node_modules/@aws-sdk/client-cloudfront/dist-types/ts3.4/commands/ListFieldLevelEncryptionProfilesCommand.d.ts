import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListFieldLevelEncryptionProfilesRequest,
  ListFieldLevelEncryptionProfilesResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListFieldLevelEncryptionProfilesCommandInput
  extends ListFieldLevelEncryptionProfilesRequest {}
export interface ListFieldLevelEncryptionProfilesCommandOutput
  extends ListFieldLevelEncryptionProfilesResult,
    __MetadataBearer {}
declare const ListFieldLevelEncryptionProfilesCommand_base: {
  new (
    input: ListFieldLevelEncryptionProfilesCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListFieldLevelEncryptionProfilesCommandInput,
    ListFieldLevelEncryptionProfilesCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListFieldLevelEncryptionProfilesCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListFieldLevelEncryptionProfilesCommandInput,
    ListFieldLevelEncryptionProfilesCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListFieldLevelEncryptionProfilesCommand extends ListFieldLevelEncryptionProfilesCommand_base {
  protected static __types: {
    api: {
      input: ListFieldLevelEncryptionProfilesRequest;
      output: ListFieldLevelEncryptionProfilesResult;
    };
    sdk: {
      input: ListFieldLevelEncryptionProfilesCommandInput;
      output: ListFieldLevelEncryptionProfilesCommandOutput;
    };
  };
}
