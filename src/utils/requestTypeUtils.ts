export const getRequestTypeVariant = (requestType: string) => {
  switch (requestType) {
    case 'NEW RECIPE':
      return 'newRecipe';
    case 'RECIPE MODIFICATION':
      return 'recipeModification';
    case 'VERSION EXTEND':
      return 'versionExtend';
    case 'VERSION ROLLBACK':
      return 'versionRollback';
    case 'NEW SIZE CODE':
      return 'newSizeCode';
    default:
      return 'outline';
  }
};

export const getStatusVariant = (status: string) => {
  if (status === 'LIVE' || status === 'REQUEST APPROVED, INVENTORY CODE MASTER UPDATED') {
    return 'statusLive';
  } else if (status === 'REJECTED') {
    return 'statusRejected';
  } else {
    return 'statusPending';
  }
};