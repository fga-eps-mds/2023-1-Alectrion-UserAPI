import { Credential } from '../../../domain/entity/credential'
import { CredentialResource } from '../credential-resource'

export class CredentialResourceConverter {
  public mapCredentialToCredentialResource(
    credential: Credential
  ): CredentialResource {
    const credentialResource = new CredentialResource()

    credentialResource.setUsername(credential.getUsername())
    credentialResource.setPassword(credential.getPassword())

    return credentialResource
  }

  public mapCredentialResourceToCredential(
    credentialResource: CredentialResource
  ): Credential {
    const credential = new Credential()

    credential.setUsername(credentialResource.getUsername())
    credential.setPassword(credentialResource.getPassword())

    return credential
  }
}
