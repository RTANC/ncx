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
                <v-card elevation="5">
                    <v-toolbar color="indigo darken-2" dark>
                        <v-toolbar-title>รายวิชา: {{ subject.name }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <p>หัวข้อ</p>
                        <ul>
                            <template v-for="topic in subject.topics">
                                <li :key="topic.topicId">
                                    {{ topic.name }}
                                </li>
                            </template>
                        </ul>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat icon color="success">
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
        <v-flex xs12 sm12 md12>
            <v-btn color="pink" dark fixed button right fab @click="dialog = true">
                <v-icon>add</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" scrollable persistent max-width="700px" transition="scale-transition">
        <v-card>
            <v-card-title primary-title>
                <p class="title">จัดการข้อมูลรายวิชา</p>
                <v-spacer></v-spacer>
                <v-btn color="gray" icon flat @click="clear">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <p>รายวิชา</p>
                            </v-flex>
                            <v-flex xs9>
                                <v-text-field name="subject[name]" label="ชื่อรายวิชา" v-model="subject.name"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-btn color="green" fab flat icon small v-if="subject.subjectId == null" @click="createSubject">
                                    <v-icon>save</v-icon>
                                </v-btn>
                                <v-btn color="warning" fab flat icon small v-else>
                                    <v-icon>create</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12>
                                <p>หัวข้อ</p>
                            </v-flex>
                            <v-flex xs9>
                                <v-text-field label="ชื่อหัวข้อ" v-model="topic.name" :disabled="subject.subjectId == null"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-btn color="pink" fab flat icon small @click="createTopic" :disabled="subject.subjectId == null">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-flex>
                            <template v-for="(topic, index) in subject.topics">
                                <v-flex xs9 :key="index">
                                    <v-text-field label="ชื่อหัวข้อ" v-model="topic.name"></v-text-field>
                                </v-flex>
                                <v-flex xs3 :key="topic.topicId">
                                    <v-btn color="warning" fab flat icon small>
                                        <v-icon>create</v-icon>
                                    </v-btn>
                                </v-flex>
                            </template>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import api from '@/services/'
export default {
    name: 'Subject',
    data () {
        return {
            dialog: false,
            valid: false,
            subject: {
                subjectId: null,
                name: null,
                topics: []
            },
            topic: {
                topicId: null,
                name: null
            },
            subjects: []
        }
    },
    methods: {
        async createSubject () {
            try {
                const subject = await api.createSubject(this.subject.name)
                this.subject.subjectId = subject.subjectId
                this.subject.name = subject.name
            } catch (error) {
                console.log(error)
            }
        },
        createTopic () {
            const topic = {
                topicId: 1,
                name: this.topic.name
            }
            this.subject.topics.unshift(topic)
            this.$refs.form.inputs[1].reset()
        },
        clear () {
            this.dialog = false;
            this.$refs.form.reset();
            this.subject = {
                subjectId: null,
                name: null,
                topics: [{ topicId: null, name: null }]
            }
        }
    },
    beforeMount () {
        if (this.$store.getters.user === null) {
            this.$router.push('Signin')
        } else {
            //GET Subject
            this.subjects = [{
                subjectId: 1,
                name: 'เทคโนโลยีเพื่อการศึกษา',
                topics: [{
                    topicId: 1,
                    name: 'การเลือกใช้เทคโนโลยีให้เหมาะสม'
                }, {
                    topicId: 2,
                    name: 'การใช้เทคโนโลยีเพื่อเการรียนรู้ด้วยตนเอง'
                }]
            }, {
                subjectId: 2,
                name: 'เทคโนโลยีเพื่อการวิจัย',
                topics: [{
                    topicId: 3,
                    name: 'การเลือกใช้เทคโนโลยีให้เหมาะสมแก่การทำวิจัย'
                }, {
                    topicId: 4,
                    name: 'การใช้เทคโนโลยีเพื่อสืบค้นงานวิจัย'
                }]
            }]
        }
    }
}
</script>
