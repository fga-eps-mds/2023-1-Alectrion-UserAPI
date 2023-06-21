import { Credential } from '../../../domain/entity/credential'
import { CredentialResource } from '../credential-resource'

export class CredentialResourceConverter {
  public mapFrom(credentialResource: CredentialResource): Credential {
    const credential = new Credential()

    credential.setUsername(credentialResource.getUsername())
    credential.setPassword(credentialResource.getPassword())

    return credential
  }
}
