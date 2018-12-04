/** @author Abhimanyu Chkarborty
 * @description view model for field details component
 */
export default {
    data() {
        return {
            loadingField: false,
            fieldFormRules: {
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
                fieldDataTypeNo: [{
                    min: 1,
                    max: 2,
                    message: this.$t('length_validation'),
                    trigger: 'blur',
                }],
            },
            field: {},
        };
    },
};