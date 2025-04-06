import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { GetParametersForImportResponseFilterSensitiveLog, } from "../models/models_0";
import { de_GetParametersForImportCommand, se_GetParametersForImportCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GetParametersForImportCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "GetParametersForImport", {})
    .n("KMSClient", "GetParametersForImportCommand")
    .f(void 0, GetParametersForImportResponseFilterSensitiveLog)
    .ser(se_GetParametersForImportCommand)
    .de(de_GetParametersForImportCommand)
    .build() {
}
