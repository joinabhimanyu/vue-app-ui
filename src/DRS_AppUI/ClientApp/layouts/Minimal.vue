<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="8" :offset="8">
                    <slot name="layoutbody"></slot>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
/* ============
   * Minimal Layout
   * ============
   *
   * Used for the register and login pages.
   *
   * Layouts are used to store a lot of shared code.
   * This way the app stays clean.
   */

export default {
  /**
   * The name of the layout.
   */
  name: 'minimal-layout'
};
</script>
