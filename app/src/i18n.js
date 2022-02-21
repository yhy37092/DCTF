import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from "react";

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    description: {
                        Home:'Home',
                        SystemAdmin: 'SystemAdmin',
                        System_Admin: 'System Admin',
                        ContestAdmin: 'Contest Admin',
                        Contest_Admin: 'Contest Admin',
                        Contest_admins: 'Contest admins',
                        Contest: 'Contest',
                        Contests: 'Contests',
                        Review: 'Review',
                        Challenges: 'Challenges',
                        Challenge: 'Challenge',
                        Teams: 'Teams',
                        Team: 'Team',
                        Submissions: 'Submissions',
                        ScoreBoard: 'ScoreBoard',
                        My: 'My',
                        grant: 'grant contest admin',
                        account_address: 'account address',
                        account: 'account',
                        Enter_account: 'Enter account',
                        Add: 'Add',
                        Sub: 'Sub',
                        Submit: 'Submit',
                        Transaction_status: 'Transaction status',
                        waiting: 'waiting for conform',
                        pending: 'pending',
                        success: 'success',
                        error: 'error',
                        Create_Contest: 'Create Contest',
                        Id: 'ID',
                        Name: 'Name',
                        Type: 'Type',
                        Fee: 'Fee',
                        Start: 'Start',
                        End: 'End',
                        State: 'State',
                        Message: 'Message',
                        Jeopardy: 'Jeopardy',
                        AWD: 'Attack With Defence',
                        Create: 'Create',
                        name_of_contest: 'The name of your contest.',
                        fee_of_contest: 'The fee of your contest',
                        start_of_contest: 'This is the time your contest start.',
                        end_of_contest: 'This is the time your contest end.',
                        message_of_contest: 'Use this to give a brief introduction to your contest.',
                        Enter_contest_name: 'Enter contest name',
                        Enter_contest_fee: 'Enter contest fee',
                        Update: 'Update',
                        Category: 'Category',
                        Value: 'Value',
                        New: 'New',
                        Captain: 'Captain',
                        member:'member',
                        Hash: 'Hash',
                        Flag: 'Flag',
                        Salt: 'Salt',
                        Create_Challenge:'Create Challenge',
                        Challenge_Detail:'Challenge Detail',
                        Contest_Detail:'Contest Detail',
                        name_of_challenge: 'The name of your challenge.',
                        category_of_contest: 'The category of your challenge.',
                        message_of_challenge: 'Use this to give a brief introduction to your challenge.',
                        Enter_challenge_name: 'Enter challenge name',
                        Enter_challenge_category: 'The files of your challenge.',
                        File:'File URL',
                        file_of_challenge: 'The name of your challenge.',
                        Enter_challenge_file: 'Enter challenge file url',
                        Hint:'Hint',
                        hint_of_challenge: 'The hint of your challenge.',
                        Enter_challenge_hint: 'Enter challenge hint.',
                        Connection_Info:'Connection Info',
                        Connection_Info_of_challenge: 'The connection info of your challenge.',
                        Enter_challenge_Connection_Info: 'Enter challenge connection info.',
                        value_of_challenge: 'This is how many points are rewarded for solving this challenge.',
                        Detail:'Detail',
                        Owner:'Owner',
                        point:'point',
                        team_name: 'team_name',
                        captain_account:'captain_account',
                        Enter_team_name:'Enter team name',
                        OnGoing:'OnGoing',
                        team_info:'team info',
                        waiting_for_approving:'Already applied,waiting for approving...',
                        approved:'your apply is approved',
                        apply_rejected:'Sorry,your apply is rejected!!!',
                        can_re_apply:'But you can re-apply',
                        Go_to_contest:'Go to contest',
                        Apply_contest:'Apply contest'
                    }
                }
            },
            zh_cn: {
                translation: {
                    description: {
                        Home:'首页',
                        SystemAdmin: '系统管理',
                        System_Admin: '系统管理',
                        ContestAdmin: '比赛管理',
                        Contest_Admin: '比赛管理',
                        Contest_admins: '比赛管理员',
                        Contest: '比赛',
                        Contests: '比赛',
                        Review: '回顾',
                        Challenges: '题目',
                        Challenge: '题目',
                        Teams: '队伍',
                        Team: '队伍',
                        team_name: '队伍名称',
                        Submissions: '提交结果',
                        ScoreBoard: '排行榜',
                        My: '我的比赛',
                        grant: '添加比赛管理员',
                        account_address: '账户地址',
                        account: '账户',
                        Enter_account: '输入账户',
                        Add: '增加',
                        Sub: '减少',
                        Submit: '提交',
                        Transaction_status: '交易状态',
                        waiting: '等待确认',
                        pending: '等待',
                        success: '成功',
                        error: '错误',
                        Create_Contest: '创建比赛',
                        Id: 'ID',
                        Name: '名称',
                        Type: '类型',
                        Fee: '费用',
                        Start: '开始时间',
                        End: '结束时间',
                        State: '状态',
                        Message: '信息',
                        Jeopardy: '解题模式',
                        AWD: '攻防模式',
                        Create: '创建',
                        name_of_contest: '比赛名称',
                        fee_of_contest: '参赛费用',
                        start_of_contest: '比赛开始时间',
                        end_of_contest: '比赛结束时间',
                        message_of_contest: '比赛描述',
                        Enter_contest_name: '输入比赛名称',
                        Enter_contest_fee: '输入比赛费用',
                        Update: '更新',
                        Category: '分类',
                        Value: '分值',
                        New: '新建',
                        Captain: '队长',
                        member:'成员',
                        Hash: 'Hash',
                        Flag: 'Flag',
                        Salt: 'Salt',
                        Create_Challenge:'创建题目',
                        Challenge_Detail:'题目详情',
                        Contest_Detail:'比赛详情',
                        name_of_challenge: '题目名称',
                        category_of_challenge: '题目分类',
                        message_of_challenge: '题目描述',
                        Enter_challenge_name: '输入题目名称',
                        Enter_challenge_category: '输入题目类别',
                        File:'文件地址',
                        file_of_challenge: '题目文件',
                        Enter_challenge_file: '输入文件地址',
                        Hint:'提示',
                        hint_of_challenge: '题目提示',
                        Enter_challenge_hint: '输入提示',
                        Connection_Info:'连接信息',
                        Connection_Info_of_challenge: '题目连接信息',
                        value_of_challenge: '题目分值',
                        Enter_challenge_Connection_Info: '输入连接信息',
                        Detail:'详细信息',
                        Owner:'管理员',
                        point:'分',
                        captain_account:'队长账户',
                        Enter_team_name:'输入队伍名称',
                        OnGoing:'进行中',
                        team_info:'队伍信息',
                        waiting_for_approving:'申请已提交，等待审核中...',
                        approved:'申请已通过',
                        apply_rejected:'你的申请被拒绝了!!!',
                        can_re_apply:'但是你可以重新申请',
                        Go_to_contest:'进入比赛',
                        Apply_contest:'申请参加比赛'
                    }
                }
            }
        }
    });

export default i18n;