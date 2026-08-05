#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum CredentialStatus {
    Issued,
    Revoked,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct CredentialRecord {
    pub institution: Address,
    pub student_name: String,
    pub degree_title: String,
    pub graduation_year: u32,
    pub status: CredentialStatus,
}

#[contract]
pub struct CredentialContract;

#[contractimpl]
impl CredentialContract {
    /// Issues a new credential. Only the institution can call this.
    pub fn issue(
        env: Env,
        registry_id: Address,
        institution: Address,
        credential_id: String,
        student_name: String,
        degree_title: String,
        graduation_year: u32,
    ) {
        institution.require_auth();

        // Verify the institution is registered and verified in the registry
        use soroban_sdk::vec;
        let is_verified: bool = env.invoke_contract(
            &registry_id,
            &Symbol::new(&env, "is_verified"),
            vec![&env, institution.to_val()],
        );
        if !is_verified {
            panic!("institution not verified in registry");
        }

        // Ensure the credential isn't already issued
        if env.storage().persistent().has(&credential_id) {
            panic!("credential already issued");
        }

        let record = CredentialRecord {
            institution: institution.clone(),
            student_name: student_name.clone(),
            degree_title,
            graduation_year,
            status: CredentialStatus::Issued,
        };

        // Store the credential in persistent storage
        env.storage().persistent().set(&credential_id, &record);

        // Publish an event for off-chain indexers
        env.events().publish(
            (symbol_short!("issued"), credential_id),
            (institution, student_name),
        );
    }

    /// Revokes an existing credential. Only the issuing institution can call this.
    pub fn revoke(env: Env, institution: Address, credential_id: String) {
        institution.require_auth();

        let mut record: CredentialRecord = env
            .storage()
            .persistent()
            .get(&credential_id)
            .expect("credential not found");

        if record.institution != institution {
            panic!("unauthorized: only the issuing institution can revoke");
        }

        if record.status == CredentialStatus::Revoked {
            panic!("credential already revoked");
        }

        record.status = CredentialStatus::Revoked;
        env.storage().persistent().set(&credential_id, &record);

        env.events().publish(
            (Symbol::new(&env, "CredentialRevoked"), credential_id),
            institution,
        );
    }

    /// Public view function to verify a credential.
    pub fn get_credential(env: Env, credential_id: String) -> CredentialRecord {
        env.storage()
            .persistent()
            .get(&credential_id)
            .expect("credential not found")
    }
}

mod test;
