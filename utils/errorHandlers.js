export const handleMissingPermissionsError = (error) => {
	if (error.rawError?.message === 'Missing Permissions') {
		return console.warn('Missing Permissions Error');
	}
	console.error(error);
};