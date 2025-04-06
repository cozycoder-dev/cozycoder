import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListDistributionsByAnycastIpListIdResultFilterSensitiveLog, } from "../models/models_1";
import { de_ListDistributionsByAnycastIpListIdCommand, se_ListDistributionsByAnycastIpListIdCommand, } from "../protocols/Aws_restXml";
export { $Command };
export class ListDistributionsByAnycastIpListIdCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "ListDistributionsByAnycastIpListId", {})
    .n("CloudFrontClient", "ListDistributionsByAnycastIpListIdCommand")
    .f(void 0, ListDistributionsByAnycastIpListIdResultFilterSensitiveLog)
    .ser(se_ListDistributionsByAnycastIpListIdCommand)
    .de(de_ListDistributionsByAnycastIpListIdCommand)
    .build() {
}
