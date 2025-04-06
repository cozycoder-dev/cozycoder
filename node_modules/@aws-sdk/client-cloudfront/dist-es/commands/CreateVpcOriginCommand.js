import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_CreateVpcOriginCommand, se_CreateVpcOriginCommand } from "../protocols/Aws_restXml";
export { $Command };
export class CreateVpcOriginCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "CreateVpcOrigin", {})
    .n("CloudFrontClient", "CreateVpcOriginCommand")
    .f(void 0, void 0)
    .ser(se_CreateVpcOriginCommand)
    .de(de_CreateVpcOriginCommand)
    .build() {
}
