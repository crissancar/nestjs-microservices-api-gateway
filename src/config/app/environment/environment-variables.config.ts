import { BinaryLike, CipherCCMTypes, CipherKey, Encoding } from 'crypto';

export const environmentVariablesConfig = {
	bcrypt: {
		salt: null as number,
		pepper: null as string,
	},
	client: {
		signature: {
			enabled: null as boolean,
			publicKey: null as string,
		},
	},
	crypto: {
		algorithm: null as CipherCCMTypes,
		iv: null as BinaryLike,
		key: null as CipherKey,
		cipher: {
			input: {
				encoding: null as Encoding,
			},
			output: {
				encoding: null as Encoding,
			},
		},
		decipher: {
			input: {
				encoding: null as Encoding,
			},
			output: {
				encoding: null as Encoding,
			},
		},
	},
	env: {
		show: null as boolean,
	},
	jwt: {
		secret: null as string,
		access: {
			expiresIn: null as number,
		},
		refresh: {
			expiresIn: null as number,
		},
	},
	logger: {
		level: null as string,
		loki: null as boolean,
	},
};
