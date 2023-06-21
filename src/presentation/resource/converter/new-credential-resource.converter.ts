import { NewCredential } from '../../../domain/entity/new-credential'
import { NewCredentialResource } from '../new-credential-resource'

export class NewCredentialResourceConverter {
  public mapFrom(newCredentialResource: NewCredentialResource): NewCredential {
    const newCredential = new NewCredential()

    newCredential.setUserId(newCredentialResource.getUserId())
    newCredential.setOldPassword(newCredentialResource.getOldPassword())
    newCredential.setNewPassword(newCredentialResource.getNewPassword())

    return newCredential
  }
}
