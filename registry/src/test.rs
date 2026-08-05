#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Env};

#[test]
fn test_register_and_get() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, RegistryContract);
    let client = RegistryContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let institution = Address::generate(&env);
    let cred_contract = Address::generate(&env);
    
    let name = String::from_str(&env, "MIT");
    let country = String::from_str(&env, "USA");

    client.register(&admin, &institution, &name, &country, &cred_contract);

    let info = client.get_institution(&institution);
    assert_eq!(info.name, name);
    assert_eq!(info.country, country);
    assert_eq!(info.is_verified, false);
    assert_eq!(info.credential_contract, cred_contract);
}

#[test]
fn test_verify_institution() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, RegistryContract);
    let client = RegistryContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let institution = Address::generate(&env);
    let cred_contract = Address::generate(&env);

    client.register(
        &admin,
        &institution,
        &String::from_str(&env, "Harvard"),
        &String::from_str(&env, "USA"),
        &cred_contract,
    );

    assert_eq!(client.is_verified(&institution), false);

    client.verify(&admin, &institution);

    assert_eq!(client.is_verified(&institution), true);
}

#[test]
#[should_panic(expected = "institution already registered")]
fn test_double_registration_panics() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, RegistryContract);
    let client = RegistryContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let institution = Address::generate(&env);
    let cred_contract = Address::generate(&env);

    client.register(
        &admin,
        &institution,
        &String::from_str(&env, "Stanford"),
        &String::from_str(&env, "USA"),
        &cred_contract,
    );

    // Try to register again
    client.register(
        &admin,
        &institution,
        &String::from_str(&env, "Stanford"),
        &String::from_str(&env, "USA"),
        &cred_contract,
    );
}
