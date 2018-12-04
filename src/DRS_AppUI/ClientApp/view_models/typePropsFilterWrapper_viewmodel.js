/** @author Abhimanyu Chkarborty
 * @description view model for type props filter wrapper component
 */
export default {
    data() {
        return {
            propsFilterCollection: [],
            selectedFilter: '',
            savedFilters: [{
                value: '',
                label: '',
            }],
        };
    },
};