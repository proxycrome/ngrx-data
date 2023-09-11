import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true, // The post updates in the store before it updates the server
      optimisticDelete: false, // false causes it to delete in the server before deleting in the store
    },
  },
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};
