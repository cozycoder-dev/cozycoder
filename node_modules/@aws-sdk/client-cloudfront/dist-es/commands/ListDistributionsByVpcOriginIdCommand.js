import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_ListDistributionsByVpcOriginIdCommand, se_ListDistributionsByVpcOriginIdCommand, } from "../protocols/Aws_restXml";
export { $Command };
export class ListDistributionsByVpcOriginIdCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "ListDistributionsByVpcOriginId", {})
    .n("CloudFrontClient", "ListDistributionsByVpcOriginIdCommand")
    .f(void 0, void 0)
    .ser(se_ListDistributionsByVpcOriginIdCommand)
    .de(de_ListDistributionsByVpcOriginIdCommand)
    .build() {
}
