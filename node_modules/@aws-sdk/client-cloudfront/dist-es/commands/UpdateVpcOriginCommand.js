import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_UpdateVpcOriginCommand, se_UpdateVpcOriginCommand } from "../protocols/Aws_restXml";
export { $Command };
export class UpdateVpcOriginCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "UpdateVpcOrigin", {})
    .n("CloudFrontClient", "UpdateVpcOriginCommand")
    .f(void 0, void 0)
    .ser(se_UpdateVpcOriginCommand)
    .de(de_UpdateVpcOriginCommand)
    .build() {
}
