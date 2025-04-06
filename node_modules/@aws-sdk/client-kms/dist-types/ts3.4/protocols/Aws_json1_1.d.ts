import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";
import {
  CancelKeyDeletionCommandInput,
  CancelKeyDeletionCommandOutput,
} from "../commands/CancelKeyDeletionCommand";
import {
  ConnectCustomKeyStoreCommandInput,
  ConnectCustomKeyStoreCommandOutput,
} from "../commands/ConnectCustomKeyStoreCommand";
import {
  CreateAliasCommandInput,
  CreateAliasCommandOutput,
} from "../commands/CreateAliasCommand";
import {
  CreateCustomKeyStoreCommandInput,
  CreateCustomKeyStoreCommandOutput,
} from "../commands/CreateCustomKeyStoreCommand";
import {
  CreateGrantCommandInput,
  CreateGrantCommandOutput,
} from "../commands/CreateGrantCommand";
import {
  CreateKeyCommandInput,
  CreateKeyCommandOutput,
} from "../commands/CreateKeyCommand";
import {
  DecryptCommandInput,
  DecryptCommandOutput,
} from "../commands/DecryptCommand";
import {
  DeleteAliasCommandInput,
  DeleteAliasCommandOutput,
} from "../commands/DeleteAliasCommand";
import {
  DeleteCustomKeyStoreCommandInput,
  DeleteCustomKeyStoreCommandOutput,
} from "../commands/DeleteCustomKeyStoreCommand";
import {
  DeleteImportedKeyMaterialCommandInput,
  DeleteImportedKeyMaterialCommandOutput,
} from "../commands/DeleteImportedKeyMaterialCommand";
import {
  DeriveSharedSecretCommandInput,
  DeriveSharedSecretCommandOutput,
} from "../commands/DeriveSharedSecretCommand";
import {
  DescribeCustomKeyStoresCommandInput,
  DescribeCustomKeyStoresCommandOutput,
} from "../commands/DescribeCustomKeyStoresCommand";
import {
  DescribeKeyCommandInput,
  DescribeKeyCommandOutput,
} from "../commands/DescribeKeyCommand";
import {
  DisableKeyCommandInput,
  DisableKeyCommandOutput,
} from "../commands/DisableKeyCommand";
import {
  DisableKeyRotationCommandInput,
  DisableKeyRotationCommandOutput,
} from "../commands/DisableKeyRotationCommand";
import {
  DisconnectCustomKeyStoreCommandInput,
  DisconnectCustomKeyStoreCommandOutput,
} from "../commands/DisconnectCustomKeyStoreCommand";
import {
  EnableKeyCommandInput,
  EnableKeyCommandOutput,
} from "../commands/EnableKeyCommand";
import {
  EnableKeyRotationCommandInput,
  EnableKeyRotationCommandOutput,
} from "../commands/EnableKeyRotationCommand";
import {
  EncryptCommandInput,
  EncryptCommandOutput,
} from "../commands/EncryptCommand";
import {
  GenerateDataKeyCommandInput,
  GenerateDataKeyCommandOutput,
} from "../commands/GenerateDataKeyCommand";
import {
  GenerateDataKeyPairCommandInput,
  GenerateDataKeyPairCommandOutput,
} from "../commands/GenerateDataKeyPairCommand";
import {
  GenerateDataKeyPairWithoutPlaintextCommandInput,
  GenerateDataKeyPairWithoutPlaintextCommandOutput,
} from "../commands/GenerateDataKeyPairWithoutPlaintextCommand";
import {
  GenerateDataKeyWithoutPlaintextCommandInput,
  GenerateDataKeyWithoutPlaintextCommandOutput,
} from "../commands/GenerateDataKeyWithoutPlaintextCommand";
import {
  GenerateMacCommandInput,
  GenerateMacCommandOutput,
} from "../commands/GenerateMacCommand";
import {
  GenerateRandomCommandInput,
  GenerateRandomCommandOutput,
} from "../commands/GenerateRandomCommand";
import {
  GetKeyPolicyCommandInput,
  GetKeyPolicyCommandOutput,
} from "../commands/GetKeyPolicyCommand";
import {
  GetKeyRotationStatusCommandInput,
  GetKeyRotationStatusCommandOutput,
} from "../commands/GetKeyRotationStatusCommand";
import {
  GetParametersForImportCommandInput,
  GetParametersForImportCommandOutput,
} from "../commands/GetParametersForImportCommand";
import {
  GetPublicKeyCommandInput,
  GetPublicKeyCommandOutput,
} from "../commands/GetPublicKeyCommand";
import {
  ImportKeyMaterialCommandInput,
  ImportKeyMaterialCommandOutput,
} from "../commands/ImportKeyMaterialCommand";
import {
  ListAliasesCommandInput,
  ListAliasesCommandOutput,
} from "../commands/ListAliasesCommand";
import {
  ListGrantsCommandInput,
  ListGrantsCommandOutput,
} from "../commands/ListGrantsCommand";
import {
  ListKeyPoliciesCommandInput,
  ListKeyPoliciesCommandOutput,
} from "../commands/ListKeyPoliciesCommand";
import {
  ListKeyRotationsCommandInput,
  ListKeyRotationsCommandOutput,
} from "../commands/ListKeyRotationsCommand";
import {
  ListKeysCommandInput,
  ListKeysCommandOutput,
} from "../commands/ListKeysCommand";
import {
  ListResourceTagsCommandInput,
  ListResourceTagsCommandOutput,
} from "../commands/ListResourceTagsCommand";
import {
  ListRetirableGrantsCommandInput,
  ListRetirableGrantsCommandOutput,
} from "../commands/ListRetirableGrantsCommand";
import {
  PutKeyPolicyCommandInput,
  PutKeyPolicyCommandOutput,
} from "../commands/PutKeyPolicyCommand";
import {
  ReEncryptCommandInput,
  ReEncryptCommandOutput,
} from "../commands/ReEncryptCommand";
import {
  ReplicateKeyCommandInput,
  ReplicateKeyCommandOutput,
} from "../commands/ReplicateKeyCommand";
import {
  RetireGrantCommandInput,
  RetireGrantCommandOutput,
} from "../commands/RetireGrantCommand";
import {
  RevokeGrantCommandInput,
  RevokeGrantCommandOutput,
} from "../commands/RevokeGrantCommand";
import {
  RotateKeyOnDemandCommandInput,
  RotateKeyOnDemandCommandOutput,
} from "../commands/RotateKeyOnDemandCommand";
import {
  ScheduleKeyDeletionCommandInput,
  ScheduleKeyDeletionCommandOutput,
} from "../commands/ScheduleKeyDeletionCommand";
import { SignCommandInput, SignCommandOutput } from "../commands/SignCommand";
import {
  TagResourceCommandInput,
  TagResourceCommandOutput,
} from "../commands/TagResourceCommand";
import {
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "../commands/UntagResourceCommand";
import {
  UpdateAliasCommandInput,
  UpdateAliasCommandOutput,
} from "../commands/UpdateAliasCommand";
import {
  UpdateCustomKeyStoreCommandInput,
  UpdateCustomKeyStoreCommandOutput,
} from "../commands/UpdateCustomKeyStoreCommand";
import {
  UpdateKeyDescriptionCommandInput,
  UpdateKeyDescriptionCommandOutput,
} from "../commands/UpdateKeyDescriptionCommand";
import {
  UpdatePrimaryRegionCommandInput,
  UpdatePrimaryRegionCommandOutput,
} from "../commands/UpdatePrimaryRegionCommand";
import {
  VerifyCommandInput,
  VerifyCommandOutput,
} from "../commands/VerifyCommand";
import {
  VerifyMacCommandInput,
  VerifyMacCommandOutput,
} from "../commands/VerifyMacCommand";
export declare const se_CancelKeyDeletionCommand: (
  input: CancelKeyDeletionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ConnectCustomKeyStoreCommand: (
  input: ConnectCustomKeyStoreCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateAliasCommand: (
  input: CreateAliasCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateCustomKeyStoreCommand: (
  input: CreateCustomKeyStoreCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateGrantCommand: (
  input: CreateGrantCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_CreateKeyCommand: (
  input: CreateKeyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DecryptCommand: (
  input: DecryptCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteAliasCommand: (
  input: DeleteAliasCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteCustomKeyStoreCommand: (
  input: DeleteCustomKeyStoreCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeleteImportedKeyMaterialCommand: (
  input: DeleteImportedKeyMaterialCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DeriveSharedSecretCommand: (
  input: DeriveSharedSecretCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeCustomKeyStoresCommand: (
  input: DescribeCustomKeyStoresCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DescribeKeyCommand: (
  input: DescribeKeyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DisableKeyCommand: (
  input: DisableKeyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DisableKeyRotationCommand: (
  input: DisableKeyRotationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_DisconnectCustomKeyStoreCommand: (
  input: DisconnectCustomKeyStoreCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_EnableKeyCommand: (
  input: EnableKeyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_EnableKeyRotationCommand: (
  input: EnableKeyRotationCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_EncryptCommand: (
  input: EncryptCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GenerateDataKeyCommand: (
  input: GenerateDataKeyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GenerateDataKeyPairCommand: (
  input: GenerateDataKeyPairCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GenerateDataKeyPairWithoutPlaintextCommand: (
  input: GenerateDataKeyPairWithoutPlaintextCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GenerateDataKeyWithoutPlaintextCommand: (
  input: GenerateDataKeyWithoutPlaintextCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GenerateMacCommand: (
  input: GenerateMacCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GenerateRandomCommand: (
  input: GenerateRandomCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetKeyPolicyCommand: (
  input: GetKeyPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetKeyRotationStatusCommand: (
  input: GetKeyRotationStatusCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetParametersForImportCommand: (
  input: GetParametersForImportCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_GetPublicKeyCommand: (
  input: GetPublicKeyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ImportKeyMaterialCommand: (
  input: ImportKeyMaterialCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListAliasesCommand: (
  input: ListAliasesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListGrantsCommand: (
  input: ListGrantsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListKeyPoliciesCommand: (
  input: ListKeyPoliciesCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListKeyRotationsCommand: (
  input: ListKeyRotationsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListKeysCommand: (
  input: ListKeysCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListResourceTagsCommand: (
  input: ListResourceTagsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ListRetirableGrantsCommand: (
  input: ListRetirableGrantsCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_PutKeyPolicyCommand: (
  input: PutKeyPolicyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ReEncryptCommand: (
  input: ReEncryptCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ReplicateKeyCommand: (
  input: ReplicateKeyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RetireGrantCommand: (
  input: RetireGrantCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RevokeGrantCommand: (
  input: RevokeGrantCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_RotateKeyOnDemandCommand: (
  input: RotateKeyOnDemandCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_ScheduleKeyDeletionCommand: (
  input: ScheduleKeyDeletionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_SignCommand: (
  input: SignCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_TagResourceCommand: (
  input: TagResourceCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UntagResourceCommand: (
  input: UntagResourceCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateAliasCommand: (
  input: UpdateAliasCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateCustomKeyStoreCommand: (
  input: UpdateCustomKeyStoreCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdateKeyDescriptionCommand: (
  input: UpdateKeyDescriptionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_UpdatePrimaryRegionCommand: (
  input: UpdatePrimaryRegionCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_VerifyCommand: (
  input: VerifyCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const se_VerifyMacCommand: (
  input: VerifyMacCommandInput,
  context: __SerdeContext
) => Promise<__HttpRequest>;
export declare const de_CancelKeyDeletionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CancelKeyDeletionCommandOutput>;
export declare const de_ConnectCustomKeyStoreCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ConnectCustomKeyStoreCommandOutput>;
export declare const de_CreateAliasCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateAliasCommandOutput>;
export declare const de_CreateCustomKeyStoreCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateCustomKeyStoreCommandOutput>;
export declare const de_CreateGrantCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateGrantCommandOutput>;
export declare const de_CreateKeyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<CreateKeyCommandOutput>;
export declare const de_DecryptCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DecryptCommandOutput>;
export declare const de_DeleteAliasCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteAliasCommandOutput>;
export declare const de_DeleteCustomKeyStoreCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteCustomKeyStoreCommandOutput>;
export declare const de_DeleteImportedKeyMaterialCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeleteImportedKeyMaterialCommandOutput>;
export declare const de_DeriveSharedSecretCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DeriveSharedSecretCommandOutput>;
export declare const de_DescribeCustomKeyStoresCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeCustomKeyStoresCommandOutput>;
export declare const de_DescribeKeyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DescribeKeyCommandOutput>;
export declare const de_DisableKeyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DisableKeyCommandOutput>;
export declare const de_DisableKeyRotationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DisableKeyRotationCommandOutput>;
export declare const de_DisconnectCustomKeyStoreCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<DisconnectCustomKeyStoreCommandOutput>;
export declare const de_EnableKeyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<EnableKeyCommandOutput>;
export declare const de_EnableKeyRotationCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<EnableKeyRotationCommandOutput>;
export declare const de_EncryptCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<EncryptCommandOutput>;
export declare const de_GenerateDataKeyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GenerateDataKeyCommandOutput>;
export declare const de_GenerateDataKeyPairCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GenerateDataKeyPairCommandOutput>;
export declare const de_GenerateDataKeyPairWithoutPlaintextCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GenerateDataKeyPairWithoutPlaintextCommandOutput>;
export declare const de_GenerateDataKeyWithoutPlaintextCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GenerateDataKeyWithoutPlaintextCommandOutput>;
export declare const de_GenerateMacCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GenerateMacCommandOutput>;
export declare const de_GenerateRandomCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GenerateRandomCommandOutput>;
export declare const de_GetKeyPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetKeyPolicyCommandOutput>;
export declare const de_GetKeyRotationStatusCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetKeyRotationStatusCommandOutput>;
export declare const de_GetParametersForImportCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetParametersForImportCommandOutput>;
export declare const de_GetPublicKeyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<GetPublicKeyCommandOutput>;
export declare const de_ImportKeyMaterialCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ImportKeyMaterialCommandOutput>;
export declare const de_ListAliasesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListAliasesCommandOutput>;
export declare const de_ListGrantsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListGrantsCommandOutput>;
export declare const de_ListKeyPoliciesCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListKeyPoliciesCommandOutput>;
export declare const de_ListKeyRotationsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListKeyRotationsCommandOutput>;
export declare const de_ListKeysCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListKeysCommandOutput>;
export declare const de_ListResourceTagsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListResourceTagsCommandOutput>;
export declare const de_ListRetirableGrantsCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ListRetirableGrantsCommandOutput>;
export declare const de_PutKeyPolicyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<PutKeyPolicyCommandOutput>;
export declare const de_ReEncryptCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ReEncryptCommandOutput>;
export declare const de_ReplicateKeyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ReplicateKeyCommandOutput>;
export declare const de_RetireGrantCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RetireGrantCommandOutput>;
export declare const de_RevokeGrantCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RevokeGrantCommandOutput>;
export declare const de_RotateKeyOnDemandCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<RotateKeyOnDemandCommandOutput>;
export declare const de_ScheduleKeyDeletionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<ScheduleKeyDeletionCommandOutput>;
export declare const de_SignCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<SignCommandOutput>;
export declare const de_TagResourceCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<TagResourceCommandOutput>;
export declare const de_UntagResourceCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UntagResourceCommandOutput>;
export declare const de_UpdateAliasCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateAliasCommandOutput>;
export declare const de_UpdateCustomKeyStoreCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateCustomKeyStoreCommandOutput>;
export declare const de_UpdateKeyDescriptionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdateKeyDescriptionCommandOutput>;
export declare const de_UpdatePrimaryRegionCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<UpdatePrimaryRegionCommandOutput>;
export declare const de_VerifyCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<VerifyCommandOutput>;
export declare const de_VerifyMacCommand: (
  output: __HttpResponse,
  context: __SerdeContext
) => Promise<VerifyMacCommandOutput>;
