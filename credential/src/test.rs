#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, contract, contractimpl, Env};

#[contract]
pub struct MockRegistry;

#[contractimpl]
impl MockRegistry {
    pub fn is_verified(_env: Env, _institution: Address) -> bool {
        true
    }
}

#[test]
fn test_issue_and_get() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, CredentialContract);
    let client = CredentialContractClient::new(&env, &contract_id);
    let registry_id = env.register_contract(None, MockRegistry);

    let institution = Address::generate(&env);
    let cred_id = String::from_str(&env, "CRED-2024-001");
    let student = String::from_str(&env, "Alice Johnson");
    let degree = String::from_str(&env, "BS Computer Science");
    let year = 2024;

    client.issue(&registry_id, &institution, &cred_id, &student, &degree, &year);

    let record = client.get_credential(&cred_id);
    assert_eq!(record.institution, institution);
    assert_eq!(record.student_name, student);
    assert_eq!(record.degree_title, degree);
    assert_eq!(record.graduation_year, year);
    assert_eq!(record.status, CredentialStatus::Issued);
}

#[test]
#[should_panic(expected = "credential already issued")]
fn test_double_issuance_panics() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, CredentialContract);
    let client = CredentialContractClient::new(&env, &contract_id);
    let registry_id = env.register_contract(None, MockRegistry);

    let institution = Address::generate(&env);
    let cred_id = String::from_str(&env, "CRED-2024-002");
    
    // First issuance
    client.issue(
        &registry_id,
        &institution,
        &cred_id,
        &String::from_str(&env, "Bob Smith"),
        &String::from_str(&env, "BA History"),
        &2024,
    );

    // Second issuance with same ID should panic
    client.issue(
        &registry_id,
        &institution,
        &cred_id,
        &String::from_str(&env, "Bob Smith"),
        &String::from_str(&env, "BA History"),
        &2024,
    );
}

#[test]
fn test_revoke() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, CredentialContract);
    let client = CredentialContractClient::new(&env, &contract_id);
    let registry_id = env.register_contract(None, MockRegistry);

    let institution = Address::generate(&env);
    let cred_id = String::from_str(&env, "CRED-2024-003");
    
    client.issue(
        &registry_id,
        &institution,
        &cred_id,
        &String::from_str(&env, "Charlie Davis"),
        &String::from_str(&env, "BFA Design"),
        &2024,
    );

    let initial_record = client.get_credential(&cred_id);
    assert_eq!(initial_record.status, CredentialStatus::Issued);

    // Revoke
    client.revoke(&institution, &cred_id);

    let revoked_record = client.get_credential(&cred_id);
    assert_eq!(revoked_record.status, CredentialStatus::Revoked);
}

#[test]
#[should_panic(expected = "unauthorized")]
fn test_unauthorized_revoke_panics() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, CredentialContract);
    let client = CredentialContractClient::new(&env, &contract_id);
    let registry_id = env.register_contract(None, MockRegistry);

    let institution = Address::generate(&env);
    let attacker = Address::generate(&env);
    let cred_id = String::from_str(&env, "CRED-2024-004");
    
    client.issue(
        &registry_id,
        &institution,
        &cred_id,
        &String::from_str(&env, "Diana Prince"),
        &String::from_str(&env, "BS Physics"),
        &2024,
    );

    // Attacker tries to revoke
    client.revoke(&attacker, &cred_id);
}
