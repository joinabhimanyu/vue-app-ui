/** @author Abhimanyu Chkarborty
 * @description view model for document details component
 */
export default {
    data() {
        const validateDocumentCategory = (rule, value, callback) => {
            if (!value || value === 0) {
                callback(new Error(this.$t('select_document_category')));
            } else callback();
        };
        const validateDocumentSource = (rule, value, callback) => {
            if (!value || value === 0) {
                callback(new Error(this.$t('select_document_source')));
            } else callback();
        };
        return {
            loadingDocument: false,
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
                documentCategoryId: [{
                    validator: validateDocumentCategory,
                    trigger: 'change',
                }],
                documentSourceId: [{
                    validator: validateDocumentSource,
                    trigger: 'change',
                }],
            },
            document: {},
            documentSourceList: [],
            documentCategoryList: [],
            loadingDocumentSourceList: false,
            loadingDocumentCategoryList: false,
        };
    },
};