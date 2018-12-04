/** @author Abhimanyu Chkarborty
 * @description view model for document categories component
 */
export default {
    data() {
        const validateArchive = (rule, value, callback) => {
            if (!value || value === 0) {
                callback(new Error(this.$t('select_archive')));
            } else callback();
        };
        return {
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
            loadingDialogDocumentCategories: false,
            loadingArchive: false,
            categoryTotal: 0,
            documentsTotal: 0,
            categoryTableProps: {
                maxHeight: 270,
                highlightCurrentRow: true,
                rowKey: row => row.documentCategoryId || 0,
            },
            documentTableProps: {
                maxHeight: 270,
            },
            archiveList: [],
            categoryModalMode: '',
            loadingCategory: false,
            loadingDocuments: false,
            showCategoryDialog: false,
            selectedCategory: {},
            categorySource: [],
            documentSource: [],
            categoryCols: [{
                    prop: 'category',
                    label: this.$t('category'),
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
                    label: this.$t('show'),
                },
                {
                    prop: 'document',
                    label: this.$t('documents'),
                },
                {
                    prop: 'archive',
                    label: this.$t('archive'),
                },
                {
                    prop: 'updated',
                    label: this.$t('updated'),
                },
            ],
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
            categoryFilter: [{
                props: [],
                vals: '',
            }],
            categoryFilterOption: [{
                    label: 'Category',
                    value: 'Category',
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
            categoryFilterValue: '',
            documentsFilter: [{
                props: [],
                vals: '',
            }],
            documentsFilterOption: [{
                    label: 'DocumentIdentity',
                    value: 'DocumentIdentity',
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
        };
    },
};