<template>
  <div>
    <el-row>
        <el-col :span="24">
            <div class="grid-content">
                <data-tables-server ref="processQueuesTable"
                                    :data="processQueues"
                                    :total="processQueuesTotal"
                                    :loading="loadingProcessQueues"
                                    :table-props="processQueuesTableProps"
                                    :show-action-bar="false"
                                    :custom-filters="processQueuesFilter"
                                    @query-change="processQueuesQueryChange">
                    <el-row slot="custom-tool-bar" style="margin-bottom:8px">
                        <el-col :span="3">
                            <el-dropdown @command="onCommandProcessQueues">
                                <el-button type="primary"><t t="actions"></t><i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col :span="3" :offset="13">
                            <el-select v-model="processQueuesFilterValue" placeholder="Select">
                                <el-option v-for="item in processQueuesFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <!--@input="debounceInput"-->
                            <el-input v-model="processQueuesFilter[0].vals"
                                        prefix-icon="el-icon-search"
                                        :placeholder="$t('search_process_queues')">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-table-column :label="processQueuesCols[0].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[0].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[1].label" min-width="auto">
                        <template scope="scope">
                            <template v-if="scope.row[processQueuesCols[1].prop]==1">
                                <el-tooltip class="item" effect="dark" content="waiting" placement="top-start">
                                    <i class="el-icon-time"></i><!--waiting-->
                                </el-tooltip>
                            </template>
                            <template v-if="scope.row[processQueuesCols[1].prop]==2">
                                <el-tooltip class="item" effect="dark" content="processing" placement="top-start">
                                    <i class="el-icon-loading"></i><!--processing-->
                                </el-tooltip>
                            </template>
                            <template v-if="scope.row[processQueuesCols[1].prop]==3">
                                <el-tooltip class="item" effect="dark" content="retry" placement="top-start">
                                    <i class="el-icon-refresh"></i><!--retry-->
                                </el-tooltip>
                            </template>
                            <template v-if="scope.row[processQueuesCols[1].prop]==4">
                                <el-tooltip class="item" effect="dark" content="completed" placement="top-start">
                                    <i class="el-icon-success"></i><!--completed-->
                                </el-tooltip>
                            </template>
                            <template v-if="scope.row[processQueuesCols[1].prop]==5">
                                <el-tooltip class="item" effect="dark" content="failed" placement="top-start">
                                    <i class="el-icon-close"></i><!--failed-->
                                </el-tooltip>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[2].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[2].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[3].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[3].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[4].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[4].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[5].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[5].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[6].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[6].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[7].label" min-width="auto">
                        <!--logstateid-->
                        <template scope="scope">
                            <template v-if="scope.row[processQueuesCols[7].prop]==1">
                                <el-tooltip class="item" effect="dark" content="warning" placement="top-start">
                                    <i class="el-icon-warning"></i><!--warning-->
                                </el-tooltip>
                            </template>
                            <template v-if="scope.row[processQueuesCols[7].prop]==2">
                                <el-tooltip class="item" effect="dark" content="error" placement="top-start">
                                    <i class="el-icon-error"></i><!--error-->
                                </el-tooltip>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[8].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[8].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="processQueuesCols[9].label" min-width="auto">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[9].prop]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="" min-width="auto">
                        <template scope="scope">
                            <el-button type="text" class="btn-showdetails" @click="openProcessQueueDetailsTab(scope.row)">
                                <t t="show_details"></t>
                            </el-button>
                        </template>
                    </el-table-column>
                </data-tables-server>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import UtilityMixin from '../mixins/utilityMixin';
import { eventBus } from '../main';
import _ from 'lodash';
import ProcessQueueViewModel from '../view_models/processQueue_viewmodel';

const getallprocessqueues = 'getallProcessQueues';

/**@author Abhimanyu Chkarborty
 * @description Process queue component
 * follows standard list compnent template with new, edit and delete
 */
export default {
  name: 'processQueue',
  mixins: [ProcessQueueViewModel, UtilityMixin],
  props: {
    navigationProperty: {
      type: String,
      required: true,
    },
  },
  methods: {
    /**@description opens process queue details tab */
    openProcessQueueDetailsTab(row) {
      let processQueueId = row.processQueueId || 0;
      this.redirectHandler('processQueueDetails', {
        type: 'onCascadeNavigation',
        additionalParam: {
          navigationProperty: processQueueId || 0,
        },
      });
    },
    /**@description refresh translations for filter options */
    refreshFilterOptions() {
      this.processQueuesFilterOption[0].label = this.$t('document_key');
      this.processQueuesFilterOption[1].label = this.$t('document_name');
      this.processQueuesFilterOption[2].label = this.$t('category');
      this.processQueuesFilterOption[3].label = this.$t('archive_key');
      this.processQueuesFilterOption[4].label = this.$t('process_schema');
    },
    /**@description refresh translations for grid cols */
    refreshGridCols() {
      this.processQueuesCols[0].label = this.$t('created');
      this.processQueuesCols[1].label = this.$t('state');
      this.processQueuesCols[2].label = this.$t('document_key');
      this.processQueuesCols[3].label = this.$t('document_name');
      this.processQueuesCols[4].label = this.$t('category');
      this.processQueuesCols[5].label = this.$t('pages');
      this.processQueuesCols[6].label = this.$t('archive_key');
      this.processQueuesCols[7].label = this.$t('log_state');
      this.processQueuesCols[8].label = this.$t('retries');
      this.processQueuesCols[9].label = this.$t('process_schema');
    },
    /**@description refresh translations */
    refreshTranslations() {
      this.refreshFilterOptions();
      this.refreshGridCols();
    },
    /**@description on command handler for process queue grid command */
    /* begin process queues grid transaction */
    onCommandProcessQueues(command) {
      const self = this;
      if (command == 'refresh') {
        this.resetAfterSaveProcessQueues();
      }
    },
    /**@description reset process queues  as empty */
    resetProcessQueues() {
      if (this.$refs.processQueuesTable) {
        this.$refs.processQueuesTable.$children[1].setCurrentRow(null);
      }
      this.processQueues = [];
      this.processQueuesFilterValue = '';
      this.processQueuesFilter[0].vals = '';
    },
    /**@description protocol function resetAfterSave for refreshing grid with new data */
    resetAfterSaveProcessQueues() {
      this.resetProcessQueues();
      if (this.navigationProperty || '' != '') {
        return this.loadProcessQueuesDocument({
          pageSize: this.defaultPageSizeGrid,
          NavigationProperty: {
            Props: [
              {
                PropName: 'DocumentIdentity',
                PropValue: this.navigationProperty || '',
              },
            ],
          },
          OrderByProp: {
            PropName: 'ProcessQueueId',
          },
          IsNavigationEnabled: true,
        });
      }
    },
    /**@description transform shape of input process queues */
    transformToInputProcessQueues(data = []) {
      return [
        ...data.map(x => {
          return {
            processQueueId: x.processQueueId || 0,
            importHandlerId: x.importHandlerId || 0,
            processSchemaId: x.processSchemaId || 0,
            documentRuleId: x.documentRuleId || 0,
            nextProcessSchemaStepId: x.nextProcessSchemaStepId || 0,
            processQueueStateId: x.processQueueStateId || 0,
            processErrorCount: x.processErrorCount || 0,
            processTotaltime: x.processTotaltime || 0,
            lastProcessDate: x.lastProcessDate,
            documentId: x.documentId || 0,
            documentKey: x.documentKey || '',
            documentIdentity: x.documentIdentity || '',
            documentName: x.documentName || '',
            documentCategory: x.documentCategory || '',
            documentStamp: x.documentStamp || '',
            documentPages: x.documentPages || '',
            documentArchiveKey: x.documentArchiveKey || '',
            created: new Date(x.created).toLocaleDateString(),
            stamp: x.stamp,
            stateId:
              x.processQueueState != null
                ? x.processQueueState.processQueueStateId == 0 ||
                  x.processQueueState.processQueueStateId == 1 ||
                  x.processQueueState.processQueueStateId == 5
                  ? 1
                  : x.processQueueState.processQueueStateId == 10
                    ? 2
                    : x.processQueueState.processQueueStateId == 15
                      ? 3
                      : x.processQueueState.processQueueStateId == 20
                        ? 4
                        : x.processQueueState.processQueueStateId == 30 ||
                          x.processQueueState.processQueueStateId == 40
                          ? 5
                          : 0
                : 0,
            logStateId:
              x.processLog != null
                ? x.processLog.filter(f => f.severity == 'Error' || f.severity == 'Warning') !=
                    null &&
                  x.processLog
                    .sort((a, b) => a.severity - b.severity)
                    .filter(f => f.severity == 'Error' || f.severity == 'Warning').length > 0
                  ? x.processLog
                      .sort((a, b) => a.severity - b.severity)
                      .filter(f => f.severity == 'Error' || f.severity == 'Warning')[0].severity ==
                    'Error'
                    ? 2
                    : 1
                  : 0
                : 0,
            processTime:
              x.processTotaltime > 3600000
                ? `${parseFloat(Math.round(x.processTotaltime / 3600000 * 100) / 100).toFixed(
                    2,
                  )} tim`
                : x.processTotaltime > 60000
                  ? `${parseFloat(Math.round(x.processTotaltime / 60000 * 100) / 100).toFixed(
                      1,
                    )} min`
                  : x.processTotaltime > 1000
                    ? `${parseFloat(Math.round(x.processTotaltime / 1000 * 100) / 100).toFixed(
                        1,
                      )} sec`
                    : `${parseFloat(Math.round(x.processTotaltime * 100) / 100).toFixed(0)} ms`,
            documentActiveState: x.document != null ? 0 : x.document.isActive ? 0 : 1,
            processSchema: x.processSchema.name || '',
          };
        }),
      ];
    },
    /**@description load process queues data with submitargs
     * @argument submitArgs:{
     * PaginationArgs:{
     * Type, Page, PageSize, BaseFilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, FilterProps:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, NavigationProperty:{ Props:[{PropName,PropValue,IsNestedProp:true|false}],
     * IsMultipleValue:true|false
     * }, OrderByProp:{ PropName, Order:'asc'|'desc'
     * }, IsNavigationEnabled:true|false
     * } |
     * GetSingleArgs:{ FilterProps:{ Props:[{PropName, PropValue, IsNestedProp:true|false}],
     * IsMultipleValue:true|false }, IsNavigationEnabled:true|false
     * }
     * }
     */
    loadProcessQueuesDocument(submitArgs = {}) {
      return new Promise((resolve, reject) => {
        const self = this;
        this.loadingProcessQueues = true;
        this.submit(getallprocessqueues, submitArgs)
          .then(resp => {
            self.processQueues = [...this.transformToInputProcessQueues(resp.data.result)];

            self.processQueuesTotal = resp.data.total;
            self.loadingProcessQueues = false;
            resolve();
          })
          .catch(_ => {
            self.$message(self.$t('error_loading_data'));
            self.loadingProcessQueues = false;
            reject();
          });
      });
    },
    /**@description query change event handler for process queue, with debounce */
    processQueuesQueryChange: _.debounce(function(args) {
      if (args) {
        if (this.processQueuesFilterValue || '' != '') {
          if (args.filters[0].vals && args.filters[0].vals.length > 0) {
            let filterProps = [
              {
                PropName: this.processQueuesFilterValue,
                PropValue: args.filters[0].vals[0].toString(),
                IsNestedProp: this.processQueuesFilterValue.indexOf('.') != -1 ? true : false,
              },
            ];
            this.loadProcessQueuesDocument({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentIdentity',
                    PropValue: this.navigationProperty || '',
                  },
                ],
              },
              FilterProps: {
                Props: filterProps,
              },
              OrderByProp: {
                PropName: 'ProcessQueueId',
              },
              IsNavigationEnabled: true,
            });
          } else {
            this.processQueuesFilter[0].vals = '';
            this.loadProcessQueuesDocument({
              page: args.page,
              pageSize: args.pageSize,
              NavigationProperty: {
                Props: [
                  {
                    PropName: 'DocumentIdentity',
                    PropValue: this.navigationProperty || '',
                  },
                ],
              },
              OrderByProp: {
                PropName: 'ProcessQueueId',
              },
              IsNavigationEnabled: true,
            });
          }
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.processQueuesFilter[0].vals = '';
        }
      }
    }, 1000),
    /* end process queues grid transaction */
  },
  /**@description created lifecycle hook for component */
  created() {
    const self = this;
    eventBus.$on('language', function() {
      try {
        self.refreshTranslations();
      } catch (e) {}
    });
  },
};
</script>
