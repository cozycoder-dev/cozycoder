import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeriveSharedSecretResponseFilterSensitiveLog, } from "../models/models_0";
import { de_DeriveSharedSecretCommand, se_DeriveSharedSecretCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class DeriveSharedSecretCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "DeriveSharedSecret", {})
    .n("KMSClient", "DeriveSharedSecretCommand")
    .f(void 0, DeriveSharedSecretResponseFilterSensitiveLog)
    .ser(se_DeriveSharedSecretCommand)
    .de(de_DeriveSharedSecretCommand)
    .build() {
}
