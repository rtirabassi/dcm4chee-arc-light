create index FK_gudw6viy7lrf5t5hetw7mbgh5 on content_item (code_fk) ;
create index FK_pyrd1nhijag5ct0ee9xqq4h78 on content_item (name_fk) ;
create index FK_9kpe6whsov3ur9rph4ih2vi5a on content_item (instance_fk) ;
create index FK_dlrthwe594xvfeta3kyuih3ip on diff_task (queue_msg_fk) ;
create index FK_1sbjtesix8hkq310i84lfg0xi on diff_task_attrs (diff_task_fk) ;
create index FK_g6atpiywpo2100kn6ovix7uet on export_task (queue_msg_fk) ;
create index FK_pev4urgkk7id2h1ijhv8domjx on hl7psu_task (mpps_fk) ;
create index FK_1fuh251le2hid2byw90hd1mly on ian_task (mpps_fk) ;
create index FK_7w6f9bi2w91qr2abl6ddxnrwq on instance (srcode_fk) ;
create index FK_s4tgrew4sh4qxoupmk3gihtrk on instance (series_fk) ;
create index FK_hjtlcwsvwihs4khh961d423e7 on location (instance_fk) ;
create index FK_bfk5vl6eoxaf0hhwiu3rbgmkn on location (uidmap_fk) ;
create index FK_nrigpgue611m33rao03nnfe5l on mpps (discreason_code_fk) ;
create index FK_grl2idmms10qq4lhmh909jxtj on mpps (accno_issuer_fk) ;
create index FK_ofg0lvfxad6r5oigw3y6da27u on mpps (patient_fk) ;
create index FK_ot32lpvialton54xqh636c4it on mwl_item (accno_issuer_fk) ;
create index FK_vkxtls2wr17wgxnxj7b2fe32 on mwl_item (patient_fk) ;
create index FK_44qwwvs50lgpog2cqmicxgt1f on mwl_item (perf_phys_name_fk) ;
create index FK_sk77bwjgaoetvy1pbcgqf08g on patient (merge_fk) ;
create index FK_39gahcxyursxfxe2ucextr65s on patient (patient_id_fk) ;
create index FK_rj42ffdtimnrcwmqqlvj24gi2 on patient (pat_name_fk) ;
create index FK_56r2g5ggptqgcvb3hl11adke2 on patient (resp_person_fk) ;
create index FK_oo232lt89k1b5h8mberi9v152 on patient_id (issuer_fk) ;
create index FK_iafiq2ugv5rd6fonwd0vd7xdx on rejected_instance (reject_code_fk) ;
create index FK_fryhnb2ppb6fcop3jrrfwvnfy on rel_study_pcode (pcode_fk) ;
create index FK_mnahh8fh77d365m6w2x4x3f4q on rel_study_pcode (study_fk) ;
create index FK_idrnml8s7gdgs04fefuf5f8h4 on rel_workitem_perf_code (perf_code_fk) ;
create index FK_8g3s4065mf5w2qc1ke71bics0 on rel_workitem_perf_code (workitem_fk) ;
create index FK_mxokt1gw5g1e7rc3ssotvuqix on retrieve_task (queue_msg_fk) ;
create index FK_oiq81nulcmtg6p85iu31igtf5 on series (inst_code_fk) ;
create index FK_pu4p7k1o9hleuk9rmxvw2ybj6 on series (metadata_fk) ;
create index FK_5n4bxxb2xa7bvvq26ao7wihky on series (perf_phys_name_fk) ;
create index FK_1og1krtgxfh207rtqjg0r7pbd on series (study_fk) ;
create index FK_eiwosf6pcc97n6y282cv1n54k on series_query_attrs (series_fk) ;
create index FK_se4n39as61wwf92ggbfc9yglo on series_req (accno_issuer_fk) ;
create index FK_bcn0jtvurqutw865pwp34pejb on series_req (req_phys_name_fk) ;
create index FK_bdkjk6ww0ulrb0nhf41c7liwt on series_req (series_fk) ;
create index FK_dh7lahwi99hk6bttrk75x4ckc on soundex_code (person_name_fk) ;
create index FK_js5xqyw5qa9rpttwmck14duow on sps_station_aet (mwl_item_fk) ;
create index FK_hch5fanx7ejwew2ag2ividq9r on stgver_task (queue_msg_fk) ;
create index FK_lp0rdx659kewq8qrqg702yfyv on study (accno_issuer_fk) ;
create index FK_e3fdaqhw7u60trs5aspf4sna9 on study (patient_fk) ;
create index FK_49eet5qgcsb32ktsqrf1mj3x2 on study (ref_phys_name_fk) ;
create index FK_sxccj81423w8o6w2tsb7nshy9 on study_query_attrs (study_fk) ;
create index FK_105wt9hglqsmtnoxgma9x18vj on verify_observer (observer_name_fk) ;
create index FK_qjgrn9rfyyt6sv14utk9ijcfq on verify_observer (instance_fk) ;
create index FK_ssbjfh0qifwln5x7ewoq4f35h on workitem (admission_issuer_fk) ;
create index FK_q2810xq8kodn16416t7wmpe7e on workitem (patient_fk) ;
create index FK_3mybk75p5pg52e7dhf30llgr2 on workitem (station_class_fk) ;
create index FK_rl2yjyeglg18q9r0p775yb7iv on workitem (station_location_fk) ;
create index FK_x15we70ujok7n2n2rw67yd3q on workitem (station_name_fk) ;
create index FK_9q0051yui2061jcc08f0gfrtu on workitem (sps_code_fk) ;
create index FK_69wnpgad3croyfw6i62qccq21 on workitem_req (accno_issuer_fk) ;
create index FK_1n56hh6qf917v7278105yh677 on workitem_req (req_phys_name_fk) ;
create index FK_9m9872gb745depwhavs4yyhpx on workitem_req (workitem_fk) ;
