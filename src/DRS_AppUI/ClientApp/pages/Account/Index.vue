<template>
    <div>
        <v-card contextual-style="dark">
            <span slot="header">
                <t t="my_account"></t>
            </span>
            <div slot="body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <t t="first_name"></t>
                            </th>
                            <th>
                                <t t="last_name"></t>
                            </th>
                            <th>
                                <t t="email"></t>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {{$store.state.account.firstName}}
                            </td>
                            <td>
                                {{$store.state.account.lastName}}
                            </td>
                            <td>
                                {{$store.state.account.email}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </v-card>
    </div>
</template>
<script>
import VCard from '../../components/Card';

export default {
  /**
   * The name of the page.
   */
  name: 'account-index',

  /**
   * The components that the page can use.
   */
  components: {
    VCard
  }
};
</script>
