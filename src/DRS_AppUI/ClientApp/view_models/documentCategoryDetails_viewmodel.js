/** @author Abhimanyu Chkarborty
 * @description view model for document category details component
 */
export default {
    data() {
        const validateArchive = (rule, value, callback) => {
            if (!value || value === 0) {
                callback(new Error(this.$t('select_archive')));
            } else callback();
        };
        const validateDocumentSource = (rule, value, callback) => {
            if (!value || value === 0) {
                callback(new Error(this.$t('select_document_source')));
            } else callback();
        };
        const validatePages = (rule, value, callback) => {
            if (!value && value === 0) {
                callback(new Error(this.$t('pages_blank')));
            } else callback();
        };
        return {
            pickerOptions: {
                shortcuts: [{
                        text: this.$t('today'),
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        },
                    },
                    {
                        text: this.$t('yesterday'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        },
                    },
                    {
                        text: this.$t('a_week_ago'),
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        },
                    },
                ],
            },
            categoryFormRules: {
                category: [{
                        required: true,
                        message: this.$t('category_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                name: [{
                        required: true,
                        message: this.$t('name_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                description: [{
                        required: true,
                        message: this.$t('description_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                archiveId: [{
                    validator: validateArchive,
                    trigger: 'change',
                }],
            },
            documentFormRules: {
                documentIdentity: [{
                        required: true,
                        message: this.$t('document_identity_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                number: [{
                        required: true,
                        message: this.$t('number_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                version: [{
                        required: true,
                        message: this.$t('version_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                name: [{
                        required: true,
                        message: this.$t('name_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                description: [{
                        required: true,
                        message: this.$t('description_blank'),
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 100,
                        message: this.$t('length_validation'),
                        trigger: 'blur',
                    },
                ],
                pages: [{
                    validator: validatePages,
                    trigger: 'blur',
                }],
                created: [{
                    required: true,
                    message: this.$t('created_blank'),
                    trigger: 'blur',
                }],
                updated: [{
                    required: true,
                    message: this.$t('updated_blank'),
                    trigger: 'blur',
                }],
                updatedBy: [{
                    required: true,
                    message: this.$t('updated_by_blank'),
                    trigger: 'blur',
                }],
                documentSourceId: [{
                    validator: validateDocumentSource,
                    trigger: 'change',
                }],
            },
            loadingDialogDocuments: false,
            loadingDocumentSource: false,
            loadingArchiveList: false,
            documentsTotal: 0,
            category: {},
            selectedDocument: {},
            documentSourceList: [],
            archiveList: [],
            documentModalMode: '',
            loadingCategory: false,
            loadingDocuments: false,
            showDocumentDialog: false,
            documentTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.documentId || 0,
            },
            documentSource: [],
            documentsFilter: [{
                props: [],
                vals: '',
            }],
            documentsFilterOption: [{
                    label: 'DocumentIdentity',
                    value: 'DocumentIdentity',
                },
                {
                    label: 'Number',
                    value: 'Number',
                },
                {
                    label: 'Name',
                    value: 'Name',
                },
                {
                    label: 'Description',
                    value: 'Description',
                },
            ],
            documentsFilterValue: '',
            documentCols: [{
                    prop: 'documentIdentity',
                    label: this.$t('document_identity'),
                },
                {
                    prop: 'documentSource',
                    label: this.$t('document_source'),
                },
                {
                    prop: 'number',
                    label: this.$t('number'),
                },
                {
                    prop: 'version',
                    label: this.$t('version'),
                },
                {
                    prop: 'name',
                    label: this.$t('name'),
                },
                {
                    prop: 'description',
                    label: this.$t('description'),
                },
                {
                    prop: 'isActive',
                    label: this.$t('is_active'),
                },
                {
                    prop: 'updated',
                    label: this.$t('updated'),
                },
            ],
        };
    },
};