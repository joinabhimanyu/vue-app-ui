<template>
    <div>
        <v-card contextual-style="white">
            <div slot="body">
                <el-row>
                    <type-props-filter-wrapper
                          prop-type-url="ProcessQueue/GetTypeHierarchy"
                          @apply-filter="applyFilter">
                    </type-props-filter-wrapper>
                </el-row>
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
                        <el-col :span="5">
                            <el-dropdown @command="onCommandProcessQueues">
                                            <el-button type="primary">
                                                <t t="actions"></t>
                                                <i class="el-icon-loading" v-if="loadingProcessQueues"></i>
                                                <i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item command="edit"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="edit"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="delete"><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="delete"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="set_all_for_processing"><i class="fa fa-clone fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="set_all_for_processing"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="set_al_for_hold"><i class="fa fa-download fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="set_al_for_hold"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="set_all_failed_for_processing"><i class="fa fa-repeat fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="set_all_failed_for_processing"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="open_document_detail"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="open_document_detail"></t></span></el-dropdown-item>
                                                <el-dropdown-item command="refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i><span style="margin-left:5px"><t t="refresh"></t></span></el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                        </el-col>
                        <el-col :span="3" :offset="10">
                            <el-select v-model="processQueuesFilterValue" placeholder="Select" @change="processQueuesFilter[0].vals=''">
                                            <el-option v-for="item in processQueuesFilterOption" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <!--@input="debounceInput"-->
                            <el-input v-model="processQueuesFilter[0].vals"
                                        prefix-icon="el-icon-search"
                                        :placeholder="$t('search_process_queues')">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-table-column type="selection" reserve-selection width="55">
                                </el-table-column>
                                <!-- processQueueId -->
                    <el-table-column :label="processQueuesCols[0].label" min-width="80">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[0].prop]}}
                        </template>
                    </el-table-column>

                    <!-- stateId iconcol -->
                    <el-table-column :label="processQueuesCols[1].label" min-width="80">
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

                    <!-- processState -->
                    <el-table-column :label="processQueuesCols[2].label" min-width="80">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[2].prop]}}
                        </template>
                    </el-table-column>

                    <!-- documentKey -->
                    <el-table-column :label="processQueuesCols[3].label" min-width="145">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[3].prop]}}
                        </template>
                    </el-table-column>

                    <!-- documentActiveState iconcol -->
                    <el-table-column :label="processQueuesCols[4].label" min-width="80">
                        <template scope="scope">
                            <template v-if="scope.row[processQueuesCols[4].prop]==1">
                                <el-tooltip class="item" effect="dark" content="pause" placement="top-start">
                                    <i class="el-icon-pause"></i><!--waiting-->
                                </el-tooltip>
                            </template>
                            <!-- <template v-if="scope.row[processQueuesCols[4].prop]==1">
                                <el-tooltip class="item" effect="dark" content="processing" placement="top-start">
                                    <i class="el-icon-loading"></i>
                                </el-tooltip>
                            </template> -->
                        </template>
                    </el-table-column>

                    <!-- documentIdentity -->
                    <el-table-column :label="processQueuesCols[5].label" min-width="148">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[5].prop]}}
                        </template>
                    </el-table-column>

                    <!-- documentName -->
                    <el-table-column :label="processQueuesCols[6].label" min-width="150">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[6].prop]}}
                        </template>
                    </el-table-column>

                    <!-- documentCategory -->
                    <el-table-column :label="processQueuesCols[7].label" min-width="80">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[7].prop]}}
                        </template>
                    </el-table-column>

                    <!-- documentPages -->
                    <el-table-column :label="processQueuesCols[8].label" min-width="80">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[8].prop]}}
                        </template>
                    </el-table-column>

                    <!-- documentArchiveKey -->
                    <el-table-column :label="processQueuesCols[9].label" min-width="139">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[9].prop]}}
                        </template>
                    </el-table-column>

                    <!-- logStateId iconcol -->
                    <el-table-column :label="processQueuesCols[10].label" min-width="80">
                        <template scope="scope">
                            <!-- <template v-if="scope.row[processQueuesCols[10].prop]==0">
                                <el-tooltip class="item" effect="dark" content="waiting" placement="top-start">
                                    <i class="el-icon-time"></i>
                                </el-tooltip>
                            </template> -->
                            <template v-if="scope.row[processQueuesCols[10].prop]==1">
                                <el-tooltip class="item" effect="dark" content="waiting" placement="top-start">
                                    <i class="el-icon-time"></i><!--waiting-->
                                </el-tooltip>
                            </template>
                            <template v-if="scope.row[processQueuesCols[10].prop]==2">
                                <el-tooltip class="item" effect="dark" content="error" placement="top-start">
                                    <i class="el-icon-error"></i>
                                </el-tooltip>
                            </template>
                        </template>
                    </el-table-column>

                    <!-- processErrorCount -->
                    <el-table-column :label="processQueuesCols[11].label" min-width="80">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[11].prop]}}
                        </template>
                    </el-table-column>

                    <!-- created -->
                    <el-table-column :label="processQueuesCols[12].label" min-width="80">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[12].prop]}}
                        </template>
                    </el-table-column>

                    <!-- importHandler -->
                    <el-table-column :label="processQueuesCols[13].label" min-width="134">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[13].prop]}}
                        </template>
                    </el-table-column>

                    <!-- processSchema -->
                    <el-table-column :label="processQueuesCols[14].label" min-width="175">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[14].prop]}}
                        </template>
                    </el-table-column>

                    <!-- nextProcessSchemaStep -->
                    <el-table-column :label="processQueuesCols[15].label" min-width="178">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[15].prop]}}
                        </template>
                    </el-table-column>

                    <!-- documentStamp -->
                    <el-table-column :label="processQueuesCols[16].label" min-width="164">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[16].prop]}}
                        </template>
                    </el-table-column>

                    <!-- lastProcessDate -->
                    <el-table-column :label="processQueuesCols[17].label" min-width="177">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[17].prop]}}
                        </template>
                    </el-table-column>

                    <!-- processTime -->
                    <el-table-column :label="processQueuesCols[18].label" min-width="80">
                        <template scope="scope">
                            {{scope.row[processQueuesCols[18].prop]}}
                        </template>
                    </el-table-column>
                </data-tables-server>
            </div>
        </el-col>
                </el-row>
            </div>
        </v-card>
</div>
</template>
<style scoped>
</style>
<script>
import Vue from 'vue';
import VCard from '../../components/Card';
import TypePropsFilterWrapper from '../../components/TypePropsFilterWrapper';
import UtilityMixin from '../../mixins/utilityMixin';
import { eventBus } from '../../main';
import _ from 'lodash';
import ProcessQueuesViewModel from '../../view_models/processQueues_viewmodel';

const getallprocessqueues = 'getallProcessQueues';

export default {
  name: 'processQueues',
  props: {
    args: {
      type: Object,
      required: true,
    },
  },
  mixins: [ProcessQueuesViewModel, UtilityMixin],
  components: {
    VCard,
    TypePropsFilterWrapper,
  },
  methods: {
    refreshTranslations() {},
    onCommandProcessQueues(command) {
      switch (command) {
        case 'edit':
          console.log('edit');
          break;
        case 'delete':
          console.log('delete');
          break;
        case 'set_all_for_processing':
          console.log('set_all_for_processing');
          break;
        case 'set_al_for_hold':
          console.log('set_al_for_hold');
          break;
        case 'set_all_failed_for_processing':
          console.log('set_all_failed_for_processing');
          break;
        case 'open_document_detail':
          console.log('open_document_detail');
          break;
        case 'refresh':
          console.log('refresh');
          break;
        default:
          break;
      }
    },
    applyFilter(searchargs) {
      if (searchargs && searchargs.Props && searchargs.Props.length > 0) {
        this.customFilterProps = searchargs;
        this.processQueuesFilterValue = '';
        this.processQueuesFilter[0].vals = '';
        let submitargs = {
          pageSize: this.defaultPageSizeGrid,
          OrderByProp: {
            PropName: 'ProcessQueueId',
          },
          IsNavigationEnabled: true,
        };
        if (searchArgs) {
          submitargs.CustomFilterProps = this.customFilterProps;
        }
        this.loadProcessQueuesDocument(submitargs);
      }
    },
    transformToInputProcessQueues(data) {
      return [
        ...data.map(x => {
          return {
            processQueueId: x.processQueueId || 0,
            stateId: x.processQueueState
              ? this.computeStateId(x.processQueueState.processQueueStateId)
              : 0, // computed
            processState: x.processQueueState ? x.processQueueState.name || '' : '', // navigation
            documentKey: x.documentKey || '',
            documentActiveState: this.computeDocumentActiveState(x.document), // computed
            documentIdentity: x.documentIdentity,
            documentName: x.documentName,
            documentCategory: x.documentCategory,
            documentPages: x.documentPages,
            documentArchiveKey: x.documentArchiveKey,
            logStateId: this.computedLogStateId(x.processLog), //computed
            processErrorCount: x.processErrorCount,
            importHandler: x.importHandler ? x.importHandler.name : '', // navigation
            processSchema: x.processSchema ? x.processSchema.name : '', // navigation
            nextProcessSchemaStep: x.nextProcessSchemaStep ? x.nextProcessSchemaStep.name : '',
            documentStamp: x.documentStamp,
            lastProcessDate: x.lastProcessDate,
            processTime: this.computeProcessTime(x.processTotaltime), // computed
            created: new Date(x.created).toLocaleDateString(),
            markForDelete: false,
          };
        }),
      ];
    },
    computeProcessTime(processTotaltime) {
      let result = '--';
      if (processTotaltime != null) {
        result =
          processTotaltime > 3600000
            ? `${Number(processTotaltime / 3600000).toFixed(2)} tim`
            : processTotaltime > 60000
              ? `${Number(processTotaltime / 60000).toFixed(1)} min`
              : processTotaltime > 1000
                ? `${Number(processTotaltime / 1000).toFixed(1)} sec`
                : `${Number(processTotaltime).toFixed(0)} ms`;
      }
      return result;
    },
    computeDocumentActiveState(document) {
      return !document ? 0 : document.IsActive ? 0 : 1;
    },
    computedLogStateId(processLogs) {
      let result = 0;
      if (processLogs) {
        if (processLogs.filter(x => x.severity == 'Error' || x.severity == 'Warning').length > 0) {
          const state = processLogs.filter(x => x.severity == 'Error' || x.severity == 'Warning');
          if (state) {
            result = state.severity == 'Error' ? 2 : 1;
          }
        }
      }
      return result;
    },
    computeStateId(processQueueStateId) {
      let result = 0;
      switch ((processQueueStateId = 0)) {
        case 0:
        case 1:
        case 5:
          result = 1;
          break;
        case 10:
          result = 2;
        case 15:
          result = 3;
        case 20:
          result = 4;
        case 30:
        case 40:
          result = 5;
        default:
          result = 0;
          break;
      }
      return result;
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
            let submitargs = {
              page: args.page,
              pageSize: args.pageSize,
              FilterProps: {
                Props: filterProps,
              },
              OrderByProp: {
                PropName: 'ProcessQueueId',
              },
              IsNavigationEnabled: true,
            };
            if (this.customFilterProps && this.customFilterProps.Props.length > 0) {
              submitargs.CustomFilterProps = this.customFilterProps;
            }
            this.loadProcessQueuesDocument(submitargs);
          } else {
            this.processQueuesFilter[0].vals = '';
            let submitargs = {
              page: args.page,
              pageSize: args.pageSize,
              OrderByProp: {
                PropName: 'ProcessQueueId',
              },
              IsNavigationEnabled: true,
            };
            if (this.customFilterProps && this.customFilterProps.Props.length > 0) {
              submitargs.CustomFilterProps = this.customFilterProps;
            }
            this.loadProcessQueuesDocument(submitargs);
          }
        } else {
          //this.$message(this.$t('select_filter_col'));
          this.processQueuesFilter[0].vals = '';
        }
      }
    }, 1000),
  },
  mounted() {
    let submitargs = {
      pageSize: this.defaultPageSizeGrid,
      OrderByProp: {
        PropName: 'ProcessQueueId',
      },
    };
    this.loadProcessQueuesDocument(submitargs);
  },
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