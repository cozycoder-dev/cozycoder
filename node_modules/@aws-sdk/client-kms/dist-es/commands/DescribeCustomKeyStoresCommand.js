import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DescribeCustomKeyStoresResponseFilterSensitiveLog, } from "../models/models_0";
import { de_DescribeCustomKeyStoresCommand, se_DescribeCustomKeyStoresCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class DescribeCustomKeyStoresCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "DescribeCustomKeyStores", {})
    .n("KMSClient", "DescribeCustomKeyStoresCommand")
    .f(void 0, DescribeCustomKeyStoresResponseFilterSensitiveLog)
    .ser(se_DescribeCustomKeyStoresCommand)
    .de(de_DescribeCustomKeyStoresCommand)
    .build() {
}
