/** @author Abhimanyu Chkarborty
 * @description view model for process queue component
 */
export default {
    data() {
        return {
            customFilterProps: {},
            // process queue variables
            processQueues: [],
            processQueuesTotal: 0,
            loadingProcessQueues: false,
            processQueuesTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.processQueueId || 0,
            },
            processQueuesFilter: [{
                props: [],
                vals: '',
            }],
            processQueuesFilterOption: [{
                    label: this.$t('document_key'),
                    value: 'documentKey',
                },
                {
                    label: this.$t('document_name'),
                    value: 'documentName',
                },
                {
                    label: this.$t('category'),
                    value: 'documentCategory',
                },
                {
                    label: this.$t('document_identity'),
                    value: 'documentIdentity',
                },
                {
                    label: this.$t('process_schema'),
                    value: 'processSchema',
                },
            ],
            processQueuesFilterValue: '',
            processQueuesCols: [{
                    prop: 'processQueueId',
                    label: this.$t('id'),
                },
                {
                    prop: 'stateId',
                    label: null,
                },
                {
                    prop: 'processState',
                    label: this.$t('state'),
                },
                {
                    prop: 'documentKey',
                    label: this.$t('document_key'),
                },
                {
                    prop: 'documentActiveState',
                    label: null,
                },
                {
                    prop: 'documentIdentity',
                    label: this.$t('document_identity'),
                },
                {
                    prop: 'documentName',
                    label: this.$t('document_name'),
                },
                {
                    prop: 'documentCategory',
                    label: this.$t('category'),
                },
                {
                    prop: 'documentPages',
                    label: this.$t('page'),
                },
                {
                    prop: 'documentArchiveKey',
                    label: this.$t('archive_key'),
                },
                {
                    prop: 'logStateId',
                    label: null,
                },
                {
                    prop: 'processErrorCount',
                    label: this.$t('retries'),
                },
                {
                    prop: 'created',
                    label: this.$t('created'),
                },
                {
                    prop: 'importHandler',
                    label: this.$t('import_handler'),
                },
                {
                    prop: 'processSchema',
                    label: this.$t('selected_process_schema'),
                },
                {
                    prop: 'nextProcessSchemaStep',
                    label: this.$t('next_process_step_handler'),
                },
                {
                    prop: 'documentStamp',
                    label: this.$t('stamp'),
                },
                {
                    prop: 'lastProcessDate',
                    label: this.$t('last_processed'),
                },
                {
                    prop: 'processTime',
                    label: this.$t('elapsed'),
                },
            ],
        };
    },
};