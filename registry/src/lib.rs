#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InstitutionInfo {
    pub name: String,
    pub country: String,
    pub is_verified: bool,
    pub credential_contract: Address,
}

#[contract]
pub struct RegistryContract;

#[contractimpl]
impl RegistryContract {
    /// Register a new institution with its credential contract
    pub fn register(
        env: Env,
        admin: Address,
        institution_addr: Address,
        name: String,
        country: String,
        credential_contract: Address,
    ) {
        admin.require_auth();

        if env.storage().persistent().has(&institution_addr) {
            panic!("institution already registered");
        }

        let info = InstitutionInfo {
            name: name.clone(),
            country,
            is_verified: false,
            credential_contract,
        };

        env.storage().persistent().set(&institution_addr, &info);

        env.events().publish(
            (symbol_short!("register"), institution_addr.clone()),
            name,
        );
    }

    /// Verify an institution (admin only)
    pub fn verify(env: Env, admin: Address, institution_addr: Address) {
        admin.require_auth();

        let mut info: InstitutionInfo = env
            .storage()
            .persistent()
            .get(&institution_addr)
            .expect("institution not found");

        info.is_verified = true;
        env.storage().persistent().set(&institution_addr, &info);

        env.events().publish(
            (Symbol::new(&env, "InstitutionVerified"), institution_addr.clone()),
            info.name,
        );
    }

    /// Get institution information
    pub fn get_institution(env: Env, institution_addr: Address) -> InstitutionInfo {
        env.storage()
            .persistent()
            .get(&institution_addr)
            .expect("institution not found")
    }

    /// Check if institution is verified
    pub fn is_verified(env: Env, institution_addr: Address) -> bool {
        let info: InstitutionInfo = env
            .storage()
            .persistent()
            .get(&institution_addr)
            .unwrap_or_else(|| InstitutionInfo {
                name: String::from_str(&env, ""),
                country: String::from_str(&env, ""),
                is_verified: false,
                credential_contract: institution_addr.clone(),
            });
        info.is_verified
    }

    /// Get the credential contract address for an institution
    pub fn get_credential_contract(env: Env, institution_addr: Address) -> Address {
        let info: InstitutionInfo = env
            .storage()
            .persistent()
            .get(&institution_addr)
            .expect("institution not found");
        info.credential_contract
    }
}

mod test;
