<template>
<v-container grid-list-md fill-height>
    <v-layout row wrap>
        <v-flex xs12 v-if="(subjects.length === 0 ? true : false)">
            <v-alert type="info" :value="(subjects.length === 0 ? true : false)" transition="scale-transition" dismissible>
                ไม่มีข้อมูลรายวิชาในระบบ
            </v-alert>
        </v-flex>
        <template v-for="subject in subjects">
            <v-flex xs12 sm6 md4 :key="subject.subjectId">
                <v-card>
                    <v-card-text>
                        {{ subject.name }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat icon="" color="success">
                            <v-icon>help</v-icon>
                        </v-btn>
                        <v-btn flat icon color="warning">
                            <v-icon>create</v-icon>
                        </v-btn>
                        <v-btn color="error" icon flat>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </template>
    </v-layout>
        <v-btn color="pink" dark absolute button right fab>
            <v-icon>add</v-icon>
        </v-btn>
</v-container>
</template>

<script>
export default {
    name: 'Subject',
    data () {
        return {
            subjects: []
        }
    },
    beforeMount () {
        if (this.$store.getters.user === null) {
            this.$router.push('Signin')
        } else {
            //GET Subject
            this.subjects = [{
                subjectId: 1,
                name: 'เทคโนโลยีเพื่อการศึกษา'
            }, {
                subjectId: 2,
                name: 'เทคโนโลยีเพื่อการวิจัย'
            }]
        }
    }
}
</script>
