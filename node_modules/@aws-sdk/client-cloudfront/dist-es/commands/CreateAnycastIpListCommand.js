import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_CreateAnycastIpListCommand, se_CreateAnycastIpListCommand } from "../protocols/Aws_restXml";
export { $Command };
export class CreateAnycastIpListCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "CreateAnycastIpList", {})
    .n("CloudFrontClient", "CreateAnycastIpListCommand")
    .f(void 0, void 0)
    .ser(se_CreateAnycastIpListCommand)
    .de(de_CreateAnycastIpListCommand)
    .build() {
}
