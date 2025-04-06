import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DeleteVpcOriginCommand, se_DeleteVpcOriginCommand } from "../protocols/Aws_restXml";
export { $Command };
export class DeleteVpcOriginCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "DeleteVpcOrigin", {})
    .n("CloudFrontClient", "DeleteVpcOriginCommand")
    .f(void 0, void 0)
    .ser(se_DeleteVpcOriginCommand)
    .de(de_DeleteVpcOriginCommand)
    .build() {
}
