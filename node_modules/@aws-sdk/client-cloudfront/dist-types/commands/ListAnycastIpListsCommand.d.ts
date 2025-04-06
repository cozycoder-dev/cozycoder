import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudFrontClient";
import { ListAnycastIpListsRequest, ListAnycastIpListsResult } from "../models/models_1";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link ListAnycastIpListsCommand}.
 */
export interface ListAnycastIpListsCommandInput extends ListAnycastIpListsRequest {
}
/**
 * @public
 *
 * The output of {@link ListAnycastIpListsCommand}.
 */
export interface ListAnycastIpListsCommandOutput extends ListAnycastIpListsResult, __MetadataBearer {
}
declare const ListAnycastIpListsCommand_base: {
    new (input: ListAnycastIpListsCommandInput): import("@smithy/smithy-client").CommandImpl<ListAnycastIpListsCommandInput, ListAnycastIpListsCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (...[input]: [] | [ListAnycastIpListsCommandInput]): import("@smithy/smithy-client").CommandImpl<ListAnycastIpListsCommandInput, ListAnycastIpListsCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Lists your Anycast static IP lists.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudFrontClient, ListAnycastIpListsCommand } from "@aws-sdk/client-cloudfront"; // ES Modules import
 * // const { CloudFrontClient, ListAnycastIpListsCommand } = require("@aws-sdk/client-cloudfront"); // CommonJS import
 * const client = new CloudFrontClient(config);
 * const input = { // ListAnycastIpListsRequest
 *   Marker: "STRING_VALUE",
 *   MaxItems: Number("int"),
 * };
 * const command = new ListAnycastIpListsCommand(input);
 * const response = await client.send(command);
 * // { // ListAnycastIpListsResult
 * //   AnycastIpLists: { // AnycastIpListCollection
 * //     Items: [ // AnycastIpListSummaries
 * //       { // AnycastIpListSummary
 * //         Id: "STRING_VALUE", // required
 * //         Name: "STRING_VALUE", // required
 * //         Status: "STRING_VALUE", // required
 * //         Arn: "STRING_VALUE", // required
 * //         IpCount: Number("int"), // required
 * //         LastModifiedTime: new Date("TIMESTAMP"), // required
 * //       },
 * //     ],
 * //     Marker: "STRING_VALUE", // required
 * //     NextMarker: "STRING_VALUE",
 * //     MaxItems: Number("int"), // required
 * //     IsTruncated: true || false, // required
 * //     Quantity: Number("int"), // required
 * //   },
 * // };
 *
 * ```
 *
 * @param ListAnycastIpListsCommandInput - {@link ListAnycastIpListsCommandInput}
 * @returns {@link ListAnycastIpListsCommandOutput}
 * @see {@link ListAnycastIpListsCommandInput} for command's `input` shape.
 * @see {@link ListAnycastIpListsCommandOutput} for command's `response` shape.
 * @see {@link CloudFrontClientResolvedConfig | config} for CloudFrontClient's `config` shape.
 *
 * @throws {@link AccessDenied} (client fault)
 *  <p>Access denied.</p>
 *
 * @throws {@link EntityNotFound} (client fault)
 *  <p>The entity was not found.</p>
 *
 * @throws {@link InvalidArgument} (client fault)
 *  <p>An argument is invalid.</p>
 *
 * @throws {@link UnsupportedOperation} (client fault)
 *  <p>This operation is not supported in this Amazon Web Services Region.</p>
 *
 * @throws {@link CloudFrontServiceException}
 * <p>Base exception class for all service exceptions from CloudFront service.</p>
 *
 *
 * @public
 */
export declare class ListAnycastIpListsCommand extends ListAnycastIpListsCommand_base {
    /** @internal type navigation helper, not in runtime. */
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
